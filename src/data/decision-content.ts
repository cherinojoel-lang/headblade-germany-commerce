export interface ComparisonRow {
  criterion: string;
  left: string;
  right: string;
}

export interface RoutineStep {
  id: "prepare" | "shave" | "calm" | "protect";
  title: string;
  body: string;
  href: string;
}

export const motoAtxRows: readonly ComparisonRow[] = [
  {
    criterion: "Führung",
    left: "MOTO: bewegliche, konturorientierte Führung entlang der Kopfform",
    right: "ATX: stärker geführtes Handling mit der klassischen HeadBlade-Rollbewegung",
  },
  {
    criterion: "Einstieg",
    left: "Für Nutzer, die eine flexible Führung bewusst einsetzen möchten",
    right: "Das aktuelle ATX-Paket ist als Einsteigerpaket mit HB4 im deutschen Review-Katalog geführt",
  },
  {
    criterion: "Klingensystem",
    left: "HB4; laut aktueller HeadBlade-Quelle auch HB6-kompatibel",
    right: "Das geprüfte ATX-Paket wird mit HB4-Klingen angeboten",
  },
  {
    criterion: "Entscheidung",
    left: "Wenn flexible Konturführung dein wichtigstes Kriterium ist",
    right: "Wenn du ein klar zusammengestelltes Starterpaket mit HB4 suchst",
  },
];

export const hb4Hb6Rows: readonly ComparisonRow[] = [
  {
    criterion: "Kompatibilität",
    left: "HB4: im aktuellen Katalog für MOTO, ATX und weitere HeadBlade-Modelle angegeben",
    right: "HB6: für das HB6-System; weitere Modelle können laut aktueller Quelle teilweise einen Adapter benötigen",
  },
  {
    criterion: "System",
    left: "HB4: Vier-Klingen-Nachfüllsystem",
    right: "HB6: Sechs-Klingen-Nachfüllsystem",
  },
  {
    criterion: "Vor dem Kauf prüfen",
    left: "Rasierermodell und vorhandenes Klingensystem abgleichen",
    right: "Rasierermodell sowie gegebenenfalls benötigten Adapter abgleichen",
  },
];

export const manualElectricRows: readonly ComparisonRow[] = [
  {
    criterion: "Führung",
    left: "HeadBlade manuell: Die Hand führt das Werkzeug direkt entlang der Kopfform",
    right: "Elektrisch: Das Gerät führt rotierende oder schwingende Scherelemente über die Kopfhaut",
  },
  {
    criterion: "Energie",
    left: "Manuelles Klingensystem benötigt keinen Akku für die Rasur",
    right: "Elektrische Systeme benötigen eine Strom- oder Akkoversorgung",
  },
  {
    criterion: "Verschleißteil",
    left: "Nachfüllklingen werden passend zum HeadBlade-System ersetzt",
    right: "Scherköpfe oder andere gerätespezifische Verschleißteile werden nach Herstellervorgabe ersetzt",
  },
  {
    criterion: "Passt eher, wenn …",
    left: "du direkte Handführung und ein spezialisiertes manuelles Kopfrasur-System suchst",
    right: "du bewusst ein motorisiertes Gerätekonzept bevorzugst",
  },
];

export const routineSteps: readonly RoutineStep[] = [
  {
    id: "prepare",
    title: "Vorbereiten",
    body: "Kopf und Werkzeug vorbereiten und für ausreichend Gleitfähigkeit sorgen.",
    href: "/pflege",
  },
  {
    id: "shave",
    title: "Rasieren",
    body: "Mit kontrollierter Handführung arbeiten und die Konturen des Kopfes bewusst abfahren.",
    href: "/anleitungen/kopf-richtig-rasieren",
  },
  {
    id: "calm",
    title: "Beruhigen",
    body: "Nach der Rasur Produktreste abspülen und die Kopfhaut ohne unnötige Reibung behandeln.",
    href: "/anleitungen/kopfhaut-pflegen",
  },
  {
    id: "protect",
    title: "Schützen",
    body: "Die weitere Kopfpflege an Alltag, Wetter und persönliche Verträglichkeit anpassen.",
    href: "/anleitungen/kopfhaut-pflegen",
  },
];
