import json

DAILY_TMPL = lambda date_str : f"""# {date_str}


"""

ZETTL_TMPL =  lambda title : f"""# {title}

## Notes



## References

"""

BIB_TMPL = lambda author, date_str, extra : f"""# {date_str}{author}{extra}


"""

OPEN_CMD = "open_command"

_setting_dict = {
	OPEN_CMD : "vim",
	"home_directory" : None
}

SETTINGS_TMPL = json.dumps(_setting_dict,indent=1)

ZETTL_PATH = "path"

_home_config_dict =lambda path:  { ZETTL_PATH : path}

HOME_CONFIG_TMPL = lambda path : json.dumps(_home_config_dict(path),indent=1)
