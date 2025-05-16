"""
Module that contain a class to validate CPF client
"""


import re


def is_valid_cpf(cpf: str) -> str:
    """
    Fn to validate CPF client.
    :return: bool.
    :rtype: bool.
    """
    cpf = re.sub(r'[^0-9]', '', cpf)
    result: bool = True
    if len(cpf) != 11 or not cpf.isnumeric():
        result = False
    # first digit
    cont = 0
    for index, digit in enumerate(cpf[:9]):
        cont += int(digit) * (index + 1)
    rest = cont % 11
    if rest == 10:
        rest = 0
    if str(rest) != cpf[9:10]:
        result = False
    # second digit
    cont = 0
    for index, digit in enumerate(cpf[:10]):
        cont += int(digit) * index
    rest = cont % 11
    if rest == 10:
        rest = 0
    if str(rest) != cpf[10:11]:
        result = False
    if not result:
        raise ValueError("Invalid CPF")
    return cpf
