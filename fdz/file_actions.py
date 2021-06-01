import json
import os

DEFAULT_DIR_STRUCTURE = {
		"name":"zettl",
		"contents":{
		"zettelkesten":{"type":"directory"},
		"bibliography":{"type":"directory"},
		"daily":{"type":"directory"},
		"settings":{"name":".fdzrc.json","type":"settings"}
		}
	}

def safe_initializer(zettl_dir_name = None, structure = DEFAULT_DIR_STRUCTURE):
	"""initialize your zettlekesten directory."""
	NAME = "name"
	CONTENTS = "contents"
	if not structure.get(NAME):
		raise ValueError("must provide name for initialization")
	if not structure.get(CONTENTS):
		raise ValueError("must provide contents in directory structure")
	if type(structure.get(CONTENTS)) != type(dict()):
		raise ValueError("contents value must be dictionary")
	root_name = structure[NAME]
	if not zettl_dir_name:
		zettl_dir_name = root_name
	if os.path.exists(zettl_dir_name):
		return False
	os.mkdir(zettl_dir_name)
	for k,v in structure[CONTENTS].items():
		new_dir_name = k
		if v.get("name"):
			new_dir_name = v.get("name")
		new_file_name = f"{zettl_dir_name}/{new_dir_name}"
		if v["type"] == "directory":
		    os.mkdir(new_file_name)
		elif v["type"] == "settings":
			with open(new_file_name, 'w'): pass
		else:
		    raise ValueError(f"Invalid type {v['Type']} for {new_file_name}")
	return True	


	

