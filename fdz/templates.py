import json

DAILY_TMPL = lambda date_str : f"""# {date_str}


"""

ZETTL_TMPL =  lambda title : f"""# {title}

## Notes



## References

"""

BIB_TMPL = lambda author, date_str, extra : f"""# {date_str}{author}{extra}


"""

_setting_dict = {
	"open_command" : None,
	"home_directory" : None
}

SETTINGS_TMPL = json.dumps(_setting_dict,indent=1)
