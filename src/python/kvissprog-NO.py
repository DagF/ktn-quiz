# -*- coding: utf-8 -*-
# ver. 0.2.3
import datetime as d

def inputhandtering():
    filnavn = "ktn-eksamen.txt" # Endre filnavnet her hvis du vil ta inn en annen kvissfil
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
    print(tema)
    return (qu, tema)

def quiz(qu):
    score = 0
    #score: holder rede på hvor mange riktige svar du har
    #max_score = len(qu)
    #max_score: Hvor mange korrekte svar du kan ha
    feil_svar = []
    #feil_svar er en liste med strenger
    #Tidligere - for k, v in qu.items(): - Endret til while - løkke
    while len(qu) > 0:
        k,v = qu.popitem() # Henter tilfeldig spørsmål og svaralternativer
        print(k)
        sistalt = len(v)-1
        for i in range(sistalt):
            print(v[i])
        #Du har riktig svar hvis input == v[-1]
        svar = input('Skriv inn ditt svar: ')
        while not (svar.isdigit() or svar > sistalt:
            print('Ugyldig svar.')
            svar = input('Skriv inn ditt svar: ')
        if svar == v[-1]:
            score = score + 1
            print()
            continue
        feil_svar.append(k + '\n' + ' - Riktig svar: ' + v[-1])
        print()
    print()
    print('Resultater.')    #Skal være med i utskriving til resultatfil
    skorstring = 'Du klarte '+str(score)+' ut av '+ str(len(qu)) + ' poeng.' + '\n'
    print(skorstring)
    feilsvar = 'Spørsmål du ikke svarte riktig på:' + '\n'
    if len(feil_svar) > 0:
        print(feilsvar)
        for el in feil_svar:
            print(el)
            feilsvar = feilsvar + el + '\n'
    return (skorstring, feilsvar)

def writeResult( skorstring, feilsvar, tema ):
    outfile = open( (tema + '.txt'), 'a' )
    outfile.write('\n')
    outfile.write( 'Resultater, ' + tema + ', ' + d.datetime.now().date().isoformat() + ', klokken ' + d.datetime.now().time().isoformat()[:8] + '\n' )
    outfile.write(skorstring)
    outfile.write(feilsvar)
    outfile.close()

def main():
    qu, tema = inputhandtering()
    skorstring, feilsvar = quiz(qu)
    writeResult( skorstring, feilsvar,tema )

main()
