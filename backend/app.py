from fastapi import FastAPI, UploadFile, File
from fastapi.responses import FileResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from pydub import AudioSegment
import tempfile
import os
import json

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Replace with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount the static directory to serve the HTML frontend and other static files
app.mount("/static", StaticFiles(directory="static"), name="static")

# Folder where discover playlists are stored
DISCOVER_FOLDER = "discover"
PLAYLIST_DATA_FILE = os.path.join("static", "playlist_data.json")

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

@app.get("/discover/")
async def list_discover_audio():
    """
    Returns playlist data from the playlist_data.json file.
    """
    if not os.path.exists(PLAYLIST_DATA_FILE):
        return JSONResponse(content={"error": "Playlist data file not found"}, status_code=404)

    with open(PLAYLIST_DATA_FILE, "r") as f:
        playlist_data = json.load(f)

    return playlist_data


@app.get("/discover/{filename}")
async def get_discover_audio(filename: str):
    """
    Serves a specific MP3 file from the 'discover' folder.
    """
    file_path = os.path.join(DISCOVER_FOLDER, filename)
    if not os.path.exists(file_path):
        return JSONResponse(content={"error": "File not found"}, status_code=404)

    return FileResponse(file_path, media_type="audio/mpeg", filename=filename)
