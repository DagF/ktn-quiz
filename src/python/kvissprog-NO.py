# -*- coding: utf-8 -*-
# ver. 0.2.2

def inputhandtering():
    filnavn = "ktn-eksamen.txt" # Endre filnavnet her hvis du vil ta inn en annen  kvissfil
    termliste = open(filnavn, 'r')
    #Handterer termliste:
    tema = termliste.readline()
    #termliste.readline()
    qu = {}
    for line in termliste:
        line = line.rstrip()
        if line[0:3] == 'Q: ':
            spors = line[3:]
            qu.update({spors:[]})
        elif line[0:3] == 'A: ':
            qu[spors].append(line[3])
        else:
            qu[spors].append(line)
    termliste.close()
    return (qu, tema)

def quiz(qu):
    score = 0
    #score: holder rede på hvor mange riktige svar du har
    #max_score = len(qu)
    #max_score: Hvor mange korrekte svar du kan ha
    feil_svar = []
    #feil_svar er en liste med strenger
    for k, v in qu.items():
        print(k)
        for i in range(len(v)-1):
            print(v[i])
        #Du har riktig svar hvis input == v[-1]
        svar = input('Skriv inn ditt svar: ')
        while not svar.isdigit():
            print('Ugyldig svar.')
            svar = input('Skriv inn ditt svar: ')
        if svar == v[-1]:
            score = score + 1
            print()
            continue
        feil_svar.append(k + ' - Riktig svar: ' + v[-1])
        print()
    print()
    print('Resultater.')
    print('Du klarte '+str(score)+' ut av '+ str(len(qu)) + ' poeng.')
    if len(feil_svar) > 0:
        print('Spørsmål du ikke svarte riktig på:')
        for el in feil_svar:
            print(el)

def main():
    qu, tema = inputhandtering()
    quiz(qu)

main()
