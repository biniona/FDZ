"""Module for holding OS file actions for fdz."""

import json
import os

from functools import wraps
from datetime import date
import fdz.templates as t

INIT_FILE = ".fdzrc.json"
DAILY = "daily"
BIB = "bibliography"
ZETTL = "zettelkesten"
SETTINGS = "settings"
NAME = "name"
CONTENTS = "contents"
DEFAULT_ZETTL_NAME = "zettl"
ZETTL_ENV_VAR = "FDZ_ZETTL_PATH"
HOME_CONFIG_FILE = f"{os.path.expanduser('~')}/.fdz.json"

DEFAULT_DIR_STRUCTURE = {
        NAME: DEFAULT_ZETTL_NAME,
        CONTENTS:{
            ZETTL : {"type":"directory"},
            BIB : {"type":"directory"},
            DAILY : {"type":"directory"},
            SETTINGS : {"name":INIT_FILE,"type":"settings"}
        }
    }


def _make_path(ext, *p):
    path = ('/'.join(p))
    if ext:
        path += ext
    return path

def _make_file(file_name, template):
    with open(file_name, 'w') as f:
        f.write(template)

def is_init():
    path = os.getcwd()
    if os.path.exists(INIT_FILE):
        #check local directory
        return True, path
    if os.getenv(ZETTL_ENV_VAR):
        # check directory of environment variable
        zettl_path = os.getenv(ZETTL_ENV_VAR)
        if os.path.exists(f"{zettl_path}/{INIT_FILE}"):
            return True, zettl_path
    if os.path.exists(HOME_CONFIG_FILE):
        # check config file in home directory
        with open(HOME_CONFIG_FILE, "r") as f:
            home_conf_dict = json.load(f)
            zettl_path = home_conf_dict.get(t.ZETTL_PATH)
            if zettl_path and os.path.exists(f"{zettl_path}/{INIT_FILE}"):
                return True, zettl_path
    return False, None

def _check_is_init(func):
    """checks if a zettekesten exists and navigates os to is"""
    @wraps(func)
    def wrapper(*args,**kwargs):
        is_init_result, path = is_init()
        if is_init_result:
            current_directory = os.getcwd()
            # navigate to the zettlekesten
            os.chdir(path)
            result = func(*args, **kwargs)
            os.chdir(current_directory)
            return result
        else:
            print("Need to initialize your zettlekesten directory.")
            #raise OSError("Direcory Not Initialized")
    return wrapper

def safe_init(zettl_dir_name = None, set_home_config = True, force = False):
    """initialize your zettlekesten directory."""
    if not force:
        # check to see if a zettelkesten already exists
        is_init_result, path = is_init()
        if is_init_result:
            return path
    if not zettl_dir_name:
        zettl_dir_name = DEFAULT_DIR_STRUCTURE[NAME]
    # full path of zettelkesten
    zettl_dir_name = f"{os.getcwd()}/{zettl_dir_name}"
    if os.path.exists(zettl_dir_name):
        return zettl_dir_name
    os.mkdir(zettl_dir_name)
    for k,v in DEFAULT_DIR_STRUCTURE[CONTENTS].items():
        new_dir_name = k
        if v.get("name"):
            new_dir_name = v.get("name")
        new_file_name = f"{zettl_dir_name}/{new_dir_name}"
        if v["type"] == "directory":
            os.mkdir(new_file_name)
        elif v["type"] == "settings":
            _make_file(new_file_name, t.SETTINGS_TMPL)
        else:
            raise ValueError(f"Invalid type {v['Type']} for {new_file_name}")
    if set_home_config:
        # update the home config file
        _make_file(HOME_CONFIG_FILE, t.HOME_CONFIG_TMPL(zettl_dir_name))
    return zettl_dir_name    

@_check_is_init
def new_daily_note():
    """make a new daily note"""
    today_str = date.today().strftime("%Y%m%d")
    new_path = _make_path(".md", DAILY, today_str)
    if os.path.exists(new_path):
        return new_path
    _make_file(new_path, t.DAILY_TMPL(today_str))
    return new_path

@_check_is_init
def new_bib_note(pub_date, author, extra = ""):
    """make a new bibliographic note"""
    new_note = _make_path(".md", BIB, f"{pub_date}{author}{extra}")
    if os.path.exists(new_note):
        return False
    _make_file(new_note, t.BIB_TMPL(pub_date, author, extra))
    return new_note

@_check_is_init
def new_zettl_note(*delimiters):
    """make a new zettelkestan note"""
    for x in delimiters:
        try:
            int(x)
        except ValueError:
            print("Invalid note name. Note must be numbers and periods.")
            return
    str_delimiters = [str(d) for d in delimiters]
    note = "-".join(str_delimiters)
    new_note = _make_path(".md", ZETTL, note)
    if os.path.exists(new_note):
        print("This note already exists. Pick a new note")
        return
    _make_file(new_note, t.ZETTL_TMPL(str_delimiters))
    return new_note

@_check_is_init
def open_file(path):
    with open(INIT_FILE, "r") as f:
        settings = json.load(f)
        open_cmd = settings.get(t.OPEN_CMD)
        system_cmd = f"{open_cmd} {path}"
        os.system(system_cmd)
