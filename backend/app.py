from fastapi import FastAPI, UploadFile, File
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pydub import AudioSegment
import tempfile
import os

app = FastAPI()

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
