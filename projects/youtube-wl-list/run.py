import os
import subprocess

try:
    subprocess.run(['yt-dlp', '--version'], check=True)
except subprocess.CalledProcessError:
    print("yt-dlp is not installed. Install it using: pip install yt-dlp")
    exit(1)

WATCH_LATER_URL = "https://www.youtube.com/playlist?list=WL"

OUTPUT_DIR = "./download"
os.makedirs(OUTPUT_DIR, exist_ok=True)

yt_dlp_command = [
    'yt-dlp',
    # '--cookies-from-browser', 'chrome',
    '--cookies', 'cookies.txt', # authenticate using cookies
    '--write-auto-sub', '--sub-lang', 'en', '--sub-format=srt', '--convert-subs', 'srt',
    '--skip-download',  # Don't download the videos, just metadata
    '--write-info-json',  # Write metadata to JSON files
    '--output', os.path.join(OUTPUT_DIR, '%(title)s.%(ext)s'),
    WATCH_LATER_URL
]

try:
    print("command: ", " ".join(yt_dlp_command))
    subprocess.run(yt_dlp_command, check=True)
    print("Information downloaded successfully.")
except subprocess.CalledProcessError as e:
    print("Error occurred:", e)
