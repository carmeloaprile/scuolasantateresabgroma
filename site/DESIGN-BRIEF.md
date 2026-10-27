# Brief di Design — Sito Scuola Paritaria "Santa Teresa del Bambino Gesù"

**Istituto:** Scuola Paritaria dell'Infanzia e Primaria "Santa Teresa del Bambino Gesù" · Via Ilario Alibrandi 23, Roma
**Ente gestore:** Suore Carmelitane Missionarie di Santa Teresa del Bambino Gesù
**Ispirazione:** Madre Maria Crocifissa Curcio — *Amare, Educare, Orientare*

---

## 1. Obiettivi e strategia di conversione

| Obiettivo | KPI | Leva nel sito |
|---|---|---|
| Prenotazioni Open Day / visite | Form inviati | CTA oro "Prenota una Visita" sempre visibile (header, quick bar mobile, fine di ogni pagina) |
| Ridurre il carico della segreteria | Accessi a Registro e Menù | Top bar desktop + quick bar mobile fissa con Registro / Menù |
| Fiducia e trasparenza | Tempo su pagina Offerta/Rette | Documenti scaricabili, rette chiare, FAQ, messaggio della Direttrice |

**Funnel:** Hero → Punti di forza → Prova sociale (Direttrice, numeri) → Attività → Open Day form.
Ogni pagina interna chiude con una CTA di ritorno all'Open Day.

---

## 2. Brand identity

### Palette

| Token | Hex | Uso |
|---|---|---|
| `--blu-900` | `#152A4D` | Footer, top bar, hero pagine interne |
| `--blu-700` | `#1F3A68` | Primario: titoli, bottone Registro, tabelle |
| `--blu-100` | `#E3EAF5` | Sfondi icone, hover nav |
| `--crema-100` | `#FBF7F0` | Sfondo pagina |
| `--crema-200` | `#F3EBDD` | Sezioni alternate |
| `--oro-500` | `#C9A96E` | **CTA principale**, eyebrow, accenti |
| `--salvia-500` | `#7E9C84` | Mensa, natura, attività |
| `--salvia-100` | `#E6EFE7` | Sfondo sezione Open Day, badge "aggiornato" |

Regola: **l'oro è riservato alle azioni di conversione** (Prenota, Scarica). Il blu è l'autorevolezza istituzionale. Il salvia segnala servizi "di cura" (mensa, natura, estate).

### Tipografia

- **Display:** *Fraunces* (serif morbido, variabile) — titoli. Richiama tradizione e calore senza risultare antico.
- **Testo:** *Nunito* (sans arrotondato) — corpo, UI, bottoni. Alta leggibilità, tono amichevole.
- Corpo 17px / 1.6 · Titoli con `clamp()` fluidi · Contrasto AA garantito su crema.

### Forme e stile
- Raggi generosi (18–28px), ombre morbide blu-trasparenti, pill button.
- Nessun grigio neutro: le superfici sono crema/bianco, i bordi `--crema-300`.
- Micro-animazioni: reveal on scroll, hover lift sulle card (disattivate con `prefers-reduced-motion`).

### Logo
`assets/logo.svg` è un **marchio provvisorio** (rosa stilizzata = Santa Teresa, croce centrale, foglia salvia). Da sostituire con il logo ufficiale dell'istituto.

---

## 3. Architettura dell'informazione

```
Home
├── Offerta Formativa        (#percorsi, #cambridge, #continuita, #valori, #documenti)
├── Servizi e Vita Scolastica (#mensa, #orari, #genitori)
├── Attività e Laboratori    (#inglese, #arte, #sport, #doposcuola, #informatica, #estate)
├── Eventi e Novità          (#eventi, #novita, newsletter)
└── Rette e Contatti         (#rette, #contatti)
Accessi rapidi (sempre visibili): Registro Elettronico · Menù Mensile · Prenota una Visita
```

### Header (desktop ≥ 1180px)
1. **Top bar blu** (36px): telefono segreteria · **Menù Mensile** · **Registro Elettronico** (evidenziato).
2. **Barra principale** (76px): logo + nome, nav a 6 voci, CTA oro "Prenota una Visita".

### Header (mobile < 860px)
- Logo compatto + hamburger → drawer con nav e i 3 bottoni rapidi.
- **Quick bar fissa in basso**: Registro · Menù · Open Day (sempre raggiungibili col pollice).

---

## 4. Struttura pagine e componenti

### Home (`index.html`)
1. **Hero** — titolo "Amare, Educare, Orientare: *il futuro del tuo bambino* inizia qui", 2 CTA, 3 trust badge, foto con card flottante "Ambiente sicuro e familiare".
2. **Barra Servizi Rapidi** (sovrapposta alla hero) — Registro · Menù PDF · Calendario/Orari.
3. **Punti di forza** — grid 4 card: Cambridge · Continuità · Mensa · Valori.
4. **Messaggio della Direttrice** — testo + checklist alleanza scuola-famiglia + citazione.
5. **Numeri** — fascia blu con 4 stat (3–11 anni, 5h+ inglese, 20 anni stesso partner mensa, 7:30–18).
6. **Attività** — 6 card con foto (Inglese, Musica/Teatro, Coding, Sport, Doposcuola, Estate).
7. **Open Day** — pannello split: date (chip) + form di prenotazione.

### Servizi e Vita Scolastica (`servizi.html`)
- Mensa: descrizione del servizio (Happy Catering), sezione trasparenza (certificazioni, conservazione, trasporto, controlli, tabella fornitori) + **widget Menù Mensile** (select mese → 2 PDF Infanzia/Primaria, badge "Aggiornato il…").
- Orari: 2 tabelle (Infanzia / Primaria) + card Calendario, Segreteria, Centri estivi.
- Area Genitori: Registro, ricevimento insegnanti/Direttrice, vita della comunità, avvisi recenti.

### Offerta Formativa (`offerta-formativa.html`)
- Tab Infanzia / Primaria con programma, checklist e orari.
- Focus Cambridge Preparation Center (sezione blu).
- Continuità educativa (timeline "radici / ali"), valori carmelitani, download PTOF / Regolamento / Patto.

### Attività e Laboratori (`attivita.html`)
- 6 schede con foto e dettagli operativi + FAQ (costi, iscrizione, età).

### Eventi e Novità (`eventi.html`)
- 6 card eventi (Open Day, Natale, serata genitori, festa fondatrice, sport, musical), elenco novità, form newsletter.

### Rette e Contatti (`rette-contatti.html`)
- 3 price card (Infanzia, Primaria, Servizi aggiuntivi) + agevolazioni (fratelli, ISEE, detrazioni).
- FAQ trasparenza (pre/post-scuola, cosa include la retta, pagamenti, iscrizioni, apertura a tutti).
- Contatti: indirizzo, tel, email, orari, come arrivare, form, mappa Google embed.

---

## 5. Micro-copy e tono di voce

**Principi:** caldo ma concreto; "tu" al genitore; verbi di cura (accompagnare, conoscere, proteggere); mai burocratico; fede espressa con semplicità, non con proclami.

Esempi usati nel sito:
- *«Dove ogni bambino è conosciuto per nome»* — personalizzazione, piccole classi.
- *«L'inglese non si studia soltanto: si vive»* — Cambridge.
- *«Pasti freschi, controllati, serviti con cura»* — mensa in catering (Happy Catering), trasparenza su fornitori e controlli HACCP.
- *«Un percorso senza salti nel vuoto»* — continuità 3–11.
- *«Le parole raccontano, ma un sorriso all'ingresso vale di più»* — CTA Open Day.
- *«Costi chiari, senza sorprese»* — trasparenza rette.
- Form: *«Ti risponderemo entro 1 giorno lavorativo. Nessun impegno.»* — abbassa la soglia.

Parole chiave da presidiare (SEO/ADV): *scuola paritaria Roma, scuola infanzia Roma, scuola primaria paritaria, scuola cattolica Roma, Cambridge Preparation Center scuola primaria, mensa scolastica controllata, pre e post-scuola, open day scuola Roma.*

---

## 6. Accessibilità e performance
- Semantica: `header/nav/main/footer`, tab con ARIA, breadcrumb, label su ogni campo, `role=status` per i messaggi.
- Contrasto AA; focus visibile; `prefers-reduced-motion` rispettato.
- Zero framework: 1 CSS + 1 JS (~30 KB totali), font via Google Fonts con `display=swap`; icone SVG inline (sprite).
- Immagini: placeholder `.photo` con didascalia → sostituire con WebP ottimizzate, `loading="lazy"`.

---

## 7. Da completare prima del go-live
- [x] Logo ufficiale (`assets/logo.png`) · Telefono 06 66416144 · Email segreteria.stbg@gmail.com
- [ ] Foto reali (vedi didascalie nei placeholder), video hero opzionale.
- [x] URL Registro Elettronico (Nuvola Madisoft) e pagine Facebook nel footer.
- [ ] Orari segreteria, date Open Day ed eventi, importi rette (segnaposto `€ 000`).
- [ ] PDF in `docs/` (PTOF, Regolamento, Patto, Calendario) e in `menu/` (`AAAA-MM-infanzia.pdf`, `AAAA-MM-primaria.pdf`).
- [x] Form collegati a Web3Forms (invio a segreteria.stbg@gmail.com, honeypot + hCaptcha anti-spam) · Privacy Policy e Note legali pubblicate.
- [ ] Cookie banner (solo se verranno aggiunti analytics o embed che installano cookie di profilazione).
- [ ] Collegare analytics (eventi: click Registro, download Menù, invio form Open Day).
- [ ] Verifica contenuti con la Direzione (citazione Direttrice, riferimenti alla fondatrice).
