# -----------------------------------------------------------------------------
# Note Language
# -----------------------------------------------------------------------------

reserved = {
    'section':'SECTION'
}

tokens = ['LCOMMENT','RCOMMENT', 'HYPHEN', 'ID'] + list(reserved.values())

t_HYPHEN = r'-'
t_LCOMMENT = r'<'
t_RCOMMENT   = r'>'

def t_ID(t):
    r'[a-zA-Z_][a-zA-Z_0-9]*'
    t.type = reserved.get(t.value,'ID')    # Check for reserved words
    return t

def t_NUMBER(t):
    r'\d+'
    t.value = int(t.value)
    return t

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
    '''NOTE : LCOMMENT EXPR RCOMMENT'''
    p[0] = p[2]

def p_statement_expr(p):
    '''EXPR : SECTION ID HYPHEN TAGS'''
    p[0] = (p[2], p[4])

def p_statement_tags(p):
    '''TAGS : ID
            | ID TAGS'''
    if (len(p) == 3):
        p[2].append(p[1])
        p[0] = p[2].copy()
    else:
        p[0] = [p[1]]

def p_error(p):
    print(f"Syntax error at {p.value!r}")

import ply.yacc as yacc
yacc.yacc()

def parse_string(input):
    return yacc.parse(input)

