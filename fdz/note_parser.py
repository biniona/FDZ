# -----------------------------------------------------------------------------
# Note Language
# -----------------------------------------------------------------------------

sections = {
    'title':'TITLE',
    'content':'CONTENT',
    'coparents':'COPARENTS',
    'children':'CHILDREN',
    'friends':'FRIENDS',
    'keywords':'KEYWORDS',
    'author':'AUTHOR',
    'year':'YEAR',
    'pages':'PAGES',
}

keywords = {
    'delimiter':'DELIMITER'
}

# combine sections and keywords into reserved words
reserved = {**sections, **keywords}

states = (
   ('comment','exclusive'),
)

tokens = ['LINE','LCOMMENT','RCOMMENT','NUMBER','ID'] + list(reserved.values())

t_LINE = r'[^<]+'

def t_LCOMMENT(t):
    r'<'
    t.lexer.begin('comment')
    return t

def t_comment_RCOMMENT(t):
    r'>'
    t.lexer.begin('INITIAL')
    return t

def t_comment_ID(t):
    r'[a-zA-Z_][a-zA-Z_0-9]*'
    t.type = reserved.get(t.value,'ID')    # Check for reserved words
    return t

def t_comment_NUMBER(t):
    r'\d+'
    t.value = int(t.value)
    return t

# Ignored characters
t_comment_ignore = " \t"

def t_comment_newline(t):
    r'\n+'
    t.lexer.lineno += t.value.count("\n")

def t_comment_error(t):
    print(f"Illegal character {t.value[0]!r}")
    t.lexer.skip(1)

# Ignored characters
t_ignore = " \t"

def t_newline(t):
    r'\n+'
    t.lexer.lineno += t.value.count("\n")

def t_error(t):
    print(f"Illegal character {t.value[0]!r}")
    t.lexer.skip(1)

# Build the lexer
import ply.lex as lex
lex.lex()

# dictionary of names (for storing variables)
names = { }

# result object
result = { }

def p_statement_start(p):
    '''NOTE : BLOCKS'''
    p[0] = p[1]

def p_statement_start(p):
    '''BLOCKS : BLOCK
              | BLOCKS BLOCK'''
    if len(p) == 2:
        p[0] = [p[1]]
    else:
        p[1].append(p[2])
        p[0] = p[1].copy()

def p_statement_block(p):
    '''BLOCK : EXPR TEXT
             | TEXT'''
    if len(p) == 3:
        p[0] = (p[1], p[2])
    else:
        p[0] = (None, p[1])

def p_statement_expr(p):
    '''EXPR : LCOMMENT SECTION RCOMMENT'''
    p[0] = p[2]

def p_statement_text(p):
    '''TEXT : LINE
            | TEXT LINE'''
    if len(p) == 2:
        p[0] = [p[1]]
    else:
        p[2].append(p[1])
        p[0] = p[2].copy()

def p_statement_section(p):
    '''SECTION : TITLE
               | CONTENT
               | COPARENTS
               | CHILDREN
               | FRIENDS
               | KEYWORDS
               | AUTHOR
               | YEAR
               | PAGES'''
    p[0] = p[1]

def p_error(p):
    print(f"Syntax error at {p.value!r}")

import ply.yacc as yacc
yacc.yacc()

def parse_string(input):
    return yacc.parse(input)

