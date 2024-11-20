from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from pydub import AudioSegment
from pathlib import Path
import nbformat
from nbconvert import ExecutePreprocessor
import json
import tempfile
import os
import subprocess

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Adjust this to match your frontend URL
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

# Mount the static directory to serve the HTML frontend and other static files
app.mount("/static", StaticFiles(directory="static"), name="static")

# Serve the index.html file at the root URL
@app.get("/")
async def get_index():
    return FileResponse(os.path.join("static", "index.html"))

@app.post("/crossfade/")
async def crossfade_audio(
    file1: UploadFile = File(...),
    file2: UploadFile = File(...),
    duration: int = 3000  # Crossfade duration in milliseconds
):
    # Load files into temporary files
    with tempfile.NamedTemporaryFile(delete=False, suffix=".mp3") as tmp1, \
         tempfile.NamedTemporaryFile(delete=False, suffix=".mp3") as tmp2:
        tmp1.write(await file1.read())
        tmp2.write(await file2.read())
        tmp1_path = tmp1.name
        tmp2_path = tmp2.name

    # Load audio segments
    audio1 = AudioSegment.from_file(tmp1_path)
    audio2 = AudioSegment.from_file(tmp2_path)

    # Perform crossfade
    crossfaded_audio = audio1.append(audio2, crossfade=duration)

    # Save the result to a temporary file
    with tempfile.NamedTemporaryFile(delete=False, suffix=".mp3") as output:
        crossfaded_path = output.name
        crossfaded_audio.export(crossfaded_path, format="mp3")

    # Clean up the temporary input files
    os.remove(tmp1_path)
    os.remove(tmp2_path)

    # Return the crossfaded file as response
    return FileResponse(crossfaded_path, media_type="audio/mpeg", filename="crossfaded.mp3")

@app.post("/run-notebook")
async def run_notebook(notebook_path: str):
    """Run a Jupyter Notebook and return its output."""
    notebook_file = Path(notebook_path)
    if not notebook_file.is_file():
        raise HTTPException(status_code=404, detail=f"Notebook {notebook_path} not found.")
    
    try:
        # Load the notebook
        with open(notebook_file, "r", encoding="utf-8") as f:
            notebook_content = nbformat.read(f, as_version=4)
        
        # Set up the ExecutePreprocessor
        ep = ExecutePreprocessor(timeout=600, kernel_name='python3')
        
        # Run the notebook
        ep.execute(notebook_content, resources={"output": "./"})

        # Save the executed notebook (optional)
        executed_notebook_path = notebook_file.stem + "_executed.ipynb"
        with open(executed_notebook_path, "w", encoding="utf-8") as f:
            nbformat.write(notebook_content, f)

        # Return the executed notebook
        return FileResponse(executed_notebook_path, media_type="application/json", filename=executed_notebook_path)
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")

@app.get("/get-mp3")
async def get_mp3():
    mp3_file = Path("output.mp3")  # Replace with your actual MP3 filename
    if not mp3_file.is_file():
        raise HTTPException(status_code=404, detail="MP3 file not found.")
    
    # Serve the MP3 file as a response
    return FileResponse(mp3_file, media_type="audio/mpeg", filename="output.mp3")
