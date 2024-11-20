from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from pydub import AudioSegment
from pathlib import Path
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

@app.post("/run-script")
async def run_script(script_path: str = "last_main.py"):
    """Run a Python script directly."""
    if not Path(script_path).is_file():
        raise HTTPException(status_code=404, detail=f"Script {script_path} not found.")
    
    try:
        # Run the script as a subprocess
        result = subprocess.run(
            ["python", script_path],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True,
            check=True
        )
        return {"status": "Script executed successfully", "output": result.stdout}
    except subprocess.CalledProcessError as e:
        return {"status": "Error executing script", "error": e.stderr}

@app.get("/get-mp3")
async def get_mp3():
    mp3_file = Path("output.mp3")  # Replace with your actual MP3 filename
    if not mp3_file.is_file():
        raise HTTPException(status_code=404, detail="MP3 file not found.")
    
    # Serve the MP3 file as a response
    return FileResponse(mp3_file, media_type="audio/mpeg", filename="output.mp3")
