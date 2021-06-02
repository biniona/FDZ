import json
import os

from functools import wraps
from datetime import date

INIT_FILE = ".fdzrc.json"
DAILY = "daily"
BIB = "bibliography"
ZETTL = "zettelkesten"
SETTINGS = "settings"
NAME = "name"
CONTENTS = "contents"

DEFAULT_DIR_STRUCTURE = {
        NAME:"zettl",
        CONTENTS:{
            ZETTL : {"type":"directory"},
            BIB : {"type":"directory"},
            DAILY : {"type":"directory"},
            SETTINGS : {"name":INIT_FILE,"type":"settings"}
        }
    }



make_path = lambda ext, *p : ('/'.join(p))+ext

def make_path(ext, *p):
    path = ('/'.join(p))
    if ext:
        path += ext
    return path

def _make_file(file_name):
    with open(file_name, 'w'): pass

def is_init():
    if os.path.exists(INIT_FILE):
        return True
    return False

def check_is_init(func):
    @wraps(func)
    def wrapper(*args,**kwargs):
        if is_init():
            result = func(*args, **kwargs)
            return result
        else:
            raise OSError("Direcory Not Initialized")
    return wrapper

def safe_init(zettl_dir_name = None):
    """initialize your zettlekesten directory."""
    root_name = DEFAULT_DIR_STRUCTURE[NAME]
    if not zettl_dir_name:
        zettl_dir_name = root_name
    if os.path.exists(zettl_dir_name):
        return False
    os.mkdir(zettl_dir_name)
    for k,v in DEFAULT_DIR_STRUCTURE[CONTENTS].items():
        new_dir_name = k
        if v.get("name"):
            new_dir_name = v.get("name")
        new_file_name = f"{zettl_dir_name}/{new_dir_name}"
        if v["type"] == "directory":
            os.mkdir(new_file_name)
        elif v["type"] == "settings":
            _make_file(new_file_name)
        else:
            raise ValueError(f"Invalid type {v['Type']} for {new_file_name}")
    return zettl_dir_name    

@check_is_init
def new_daily_note():
    today_str = date.today().strftime("%Y%m%d")
    new_path = make_path(".md", DAILY, today_str)
    if os.path.exists(new_path):
        return False
    _make_file(new_path)
    return new_path

@check_is_init
def new_bib_note(pub_date, author, extra = ""):
    new_note = make_path(".md", BIB, f"{pub_date}{author}{extra}")
    if os.path.exists(new_note):
    	return False
    _make_file(new_note)
    return new_note




 


