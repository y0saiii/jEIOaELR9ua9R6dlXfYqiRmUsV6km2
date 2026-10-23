import os
import sys
import json
import urllib.request
import zipfile
import shutil
import tempfile
import subprocess

REPO_URL = "https://github.com/y0saiii/jEIOaELR9ua9R6dlXfYqiRmUsV6km2.git"
RAW_URL = "https://raw.githubusercontent.com/y0saiii/jEIOaELR9ua9R6dlXfYqiRmUsV6km2/main/version.json"
ZIP_URL = "https://github.com/y0saiii/jEIOaELR9ua9R6dlXfYqiRmUsV6km2/archive/refs/heads/main.zip"

def get_local_version():
    try:
        with open('manifest.json', 'r', encoding='utf-8') as f:
            data = json.load(f)
        return data.get('version', '0.0.0')
    except Exception:
        try:
            with open('prunecord.js', 'r', encoding='utf-8') as f:
                content = f.read()
            for line in content.splitlines():
                if "VER" in line and "=" in line and "'" in line:
                    return line.split("'")[1]
        except Exception:
            pass
    return '0.0.0'

def get_remote_version():
    try:
        req = urllib.request.Request(RAW_URL, headers={'User-Agent': 'PrunecordUpdater'})
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = json.loads(resp.read().decode('utf-8'))
        return data.get('version', '0.0.0')
    except Exception:
        return None

def compare_versions(v1, v2):
    def parse(v):
        parts = v.split('.')
        return [int(p) for p in parts if p.isdigit()]
    p1, p2 = parse(v1), parse(v2)
    while len(p1) < len(p2):
        p1.append(0)
    while len(p2) < len(p1):
        p2.append(0)
    for a,b in zip(p1,p2):
        if a < b: return -1
        if a > b: return 1
    return 0

def update():
    local = get_local_version()
    remote = get_remote_version()
    if not remote:
        print('Could not check for updates.')
        return
    if compare_versions(local, remote) >= 0:
        print('Already up to date.')
        return
    print(f'Updating from {local} to {remote}...')
    try:
        cwd = os.getcwd()
        tmpdir = tempfile.mkdtemp()
        zip_path = os.path.join(tmpdir, 'update.zip')
        req = urllib.request.Request(ZIP_URL, headers={'User-Agent': 'PrunecordUpdater'})
        with urllib.request.urlopen(req, timeout=30) as resp:
            with open(zip_path, 'wb') as f:
                f.write(resp.read())
        with zipfile.ZipFile(zip_path, 'r') as z:
            z.extractall(tmpdir)
        extracted = None
        for item in os.listdir(tmpdir):
            full = os.path.join(tmpdir, item)
            if os.path.isdir(full) and item != os.path.basename(zip_path):
                extracted = full
                break
        if not extracted:
            extracted = tmpdir
        for item in os.listdir(extracted):
            if item == 'updater.py':
                continue
            src = os.path.join(extracted, item)
            dst = os.path.join(cwd, item)
            if os.path.isdir(src):
                if os.path.exists(dst):
                    shutil.rmtree(dst)
                shutil.copytree(src, dst)
            else:
                shutil.copy2(src, dst)
        shutil.rmtree(tmpdir)
        print('Update complete.')
    except Exception as e:
        print(f'Update failed: {e}')

if __name__ == '__main__':
    update()
