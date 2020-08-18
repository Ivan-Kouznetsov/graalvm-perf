//based on: https://benchmarksgame-team.pages.debian.net/benchmarksgame/program/regexredux-node-3.html but single threaded

const n = process.argv[2] || 1000;

const data= `
>ONE Homo sapiens alu
GGCCGGGCGCGGTGGCTCACGCCTGTAATCCCAGCACTTTGGGAGGCCGAGGCGGGCGGA
TCACCTGAGGTCAGGAGTTCGAGACCAGCCTGGCCAACATGGTGAAACCCCGTCTCTACT
AAAAATACAAAAATTAGCCGGGCGTGGTGGCGCGCGCCTGTAATCCCAGCTACTCGGGAG
GCTGAGGCAGGAGAATCGCTTGAACCCGGGAGGCGGAGGTTGCAGTGAGCCGAGATCGCG
CCACTGCACTCCAGCCTGGGCGACAGAGCGAGACTCCGTCTCAAAAAGGCCGGGCGCGGT
GGCTCACGCCTGTAATCCCAGCACTTTGGGAGGCCGAGGCGGGCGGATCACCTGAGGTCA
GGAGTTCGAGACCAGCCTGGCCAACATGGTGAAACCCCGTCTCTACTAAAAATACAAAAA
TTAGCCGGGCGTGGTGGCGCGCGCCTGTAATCCCAGCTACTCGGGAGGCTGAGGCAGGAG
AATCGCTTGAACCCGGGAGGCGGAGGTTGCAGTGAGCCGAGATCGCGCCACTGCACTCCA
GCCTGGGCGACAGAGCGAGACTCCGTCTCAAAAAGGCCGGGCGCGGTGGCTCACGCCTGT
AATCCCAGCACTTTGGGAGGCCGAGGCGGGCGGATCACCTGAGGTCAGGAGTTCGAGACC
AGCCTGGCCAACATGGTGAAACCCCGTCTCTACTAAAAATACAAAAATTAGCCGGGCGTG
GTGGCGCGCGCCTGTAATCCCAGCTACTCGGGAGGCTGAGGCAGGAGAATCGCTTGAACC
CGGGAGGCGGAGGTTGCAGTGAGCCGAGATCGCGCCACTGCACTCCAGCCTGGGCGACAG
AGCGAGACTCCGTCTCAAAAAGGCCGGGCGCGGTGGCTCACGCCTGTAATCCCAGCACTT
TGGGAGGCCGAGGCGGGCGGATCACCTGAGGTCAGGAGTTCGAGACCAGCCTGGCCAACA
TGGTGAAACCCCGTCTCTACTAAAAATACAAAAATTAGCCGGGCGTGGTGGCGCGCGCCT
GTAATCCCAGCTACTCGGGAGGCTGAGGCAGGAGAATCGCTTGAACCCGGGAGGCGGAGG
TTGCAGTGAGCCGAGATCGCGCCACTGCACTCCAGCCTGGGCGACAGAGCGAGACTCCGT
CTCAAAAAGGCCGGGCGCGGTGGCTCACGCCTGTAATCCCAGCACTTTGGGAGGCCGAGG
CGGGCGGATCACCTGAGGTCAGGAGTTCGAGACCAGCCTGGCCAACATGGTGAAACCCCG
TCTCTACTAAAAATACAAAAATTAGCCGGGCGTGGTGGCGCGCGCCTGTAATCCCAGCTA
CTCGGGAGGCTGAGGCAGGAGAATCGCTTGAACCCGGGAGGCGGAGGTTGCAGTGAGCCG
AGATCGCGCCACTGCACTCCAGCCTGGGCGACAGAGCGAGACTCCGTCTCAAAAAGGCCG
GGCGCGGTGGCTCACGCCTGTAATCCCAGCACTTTGGGAGGCCGAGGCGGGCGGATCACC
TGAGGTCAGGAGTTCGAGACCAGCCTGGCCAACATGGTGAAACCCCGTCTCTACTAAAAA
TACAAAAATTAGCCGGGCGTGGTGGCGCGCGCCTGTAATCCCAGCTACTCGGGAGGCTGA
GGCAGGAGAATCGCTTGAACCCGGGAGGCGGAGGTTGCAGTGAGCCGAGATCGCGCCACT
GCACTCCAGCCTGGGCGACAGAGCGAGACTCCGTCTCAAAAAGGCCGGGCGCGGTGGCTC
ACGCCTGTAATCCCAGCACTTTGGGAGGCCGAGGCGGGCGGATCACCTGAGGTCAGGAGT
TCGAGACCAGCCTGGCCAACATGGTGAAACCCCGTCTCTACTAAAAATACAAAAATTAGC
CGGGCGTGGTGGCGCGCGCCTGTAATCCCAGCTACTCGGGAGGCTGAGGCAGGAGAATCG
CTTGAACCCGGGAGGCGGAGGTTGCAGTGAGCCGAGATCGCGCCACTGCACTCCAGCCTG
GGCGACAGAGCGAGACTCCG
>TWO IUB ambiguity codes
cttBtatcatatgctaKggNcataaaSatgtaaaDcDRtBggDtctttataattcBgtcg
tactDtDagcctatttSVHtHttKtgtHMaSattgWaHKHttttagacatWatgtRgaaa
NtactMcSMtYtcMgRtacttctWBacgaaatatagScDtttgaagacacatagtVgYgt
cattHWtMMWcStgttaggKtSgaYaaccWStcgBttgcgaMttBYatcWtgacaYcaga
gtaBDtRacttttcWatMttDBcatWtatcttactaBgaYtcttgttttttttYaaScYa
HgtgttNtSatcMtcVaaaStccRcctDaataataStcYtRDSaMtDttgttSagtRRca
tttHatSttMtWgtcgtatSSagactYaaattcaMtWatttaSgYttaRgKaRtccactt
tattRggaMcDaWaWagttttgacatgttctacaaaRaatataataaMttcgDacgaSSt
acaStYRctVaNMtMgtaggcKatcttttattaaaaagVWaHKYagtttttatttaacct
tacgtVtcVaattVMBcttaMtttaStgacttagattWWacVtgWYagWVRctDattBYt
gtttaagaagattattgacVatMaacattVctgtBSgaVtgWWggaKHaatKWcBScSWa
accRVacacaaactaccScattRatatKVtactatatttHttaagtttSKtRtacaaagt
RDttcaaaaWgcacatWaDgtDKacgaacaattacaRNWaatHtttStgttattaaMtgt
tgDcgtMgcatBtgcttcgcgaDWgagctgcgaggggVtaaScNatttacttaatgacag
cccccacatYScaMgtaggtYaNgttctgaMaacNaMRaacaaacaKctacatagYWctg
ttWaaataaaataRattagHacacaagcgKatacBttRttaagtatttccgatctHSaat
actcNttMaagtattMtgRtgaMgcataatHcMtaBSaRattagttgatHtMttaaKagg
YtaaBataSaVatactWtataVWgKgttaaaacagtgcgRatatacatVtHRtVYataSa
KtWaStVcNKHKttactatccctcatgWHatWaRcttactaggatctataDtDHBttata
aaaHgtacVtagaYttYaKcctattcttcttaataNDaaggaaaDYgcggctaaWSctBa
aNtgctggMBaKctaMVKagBaactaWaDaMaccYVtNtaHtVWtKgRtcaaNtYaNacg
gtttNattgVtttctgtBaWgtaattcaagtcaVWtactNggattctttaYtaaagccgc
tcttagHVggaYtgtNcDaVagctctctKgacgtatagYcctRYHDtgBattDaaDgccK
tcHaaStttMcctagtattgcRgWBaVatHaaaataYtgtttagMDMRtaataaggatMt
ttctWgtNtgtgaaaaMaatatRtttMtDgHHtgtcattttcWattRSHcVagaagtacg
ggtaKVattKYagactNaatgtttgKMMgYNtcccgSKttctaStatatNVataYHgtNa
BKRgNacaactgatttcctttaNcgatttctctataScaHtataRagtcRVttacDSDtt
aRtSatacHgtSKacYagttMHtWataggatgactNtatSaNctataVtttRNKtgRacc
tttYtatgttactttttcctttaaacatacaHactMacacggtWataMtBVacRaSaatc
cgtaBVttccagccBcttaRKtgtgcctttttRtgtcagcRttKtaaacKtaaatctcac
aattgcaNtSBaaccgggttattaaBcKatDagttactcttcattVtttHaaggctKKga
tacatcBggScagtVcacattttgaHaDSgHatRMaHWggtatatRgccDttcgtatcga
aacaHtaagttaRatgaVacttagattVKtaaYttaaatcaNatccRttRRaMScNaaaD
gttVHWgtcHaaHgacVaWtgttScactaagSgttatcttagggDtaccagWattWtRtg
ttHWHacgattBtgVcaYatcggttgagKcWtKKcaVtgaYgWctgYggVctgtHgaNcV
taBtWaaYatcDRaaRtSctgaHaYRttagatMatgcatttNattaDttaattgttctaa
ccctcccctagaWBtttHtBccttagaVaatMcBHagaVcWcagBVttcBtaYMccagat
gaaaaHctctaacgttagNWRtcggattNatcRaNHttcagtKttttgWatWttcSaNgg
gaWtactKKMaacatKatacNattgctWtatctaVgagctatgtRaHtYcWcttagccaa
tYttWttaWSSttaHcaaaaagVacVgtaVaRMgattaVcDactttcHHggHRtgNcctt
tYatcatKgctcctctatVcaaaaKaaaagtatatctgMtWtaaaacaStttMtcgactt
taSatcgDataaactaaacaagtaaVctaggaSccaatMVtaaSKNVattttgHccatca
cBVctgcaVatVttRtactgtVcaattHgtaaattaaattttYtatattaaRSgYtgBag
aHSBDgtagcacRHtYcBgtcacttacactaYcgctWtattgSHtSatcataaatataHt
cgtYaaMNgBaatttaRgaMaatatttBtttaaaHHKaatctgatWatYaacttMctctt
ttVctagctDaaagtaVaKaKRtaacBgtatccaaccactHHaagaagaaggaNaaatBW
attccgStaMSaMatBttgcatgRSacgttVVtaaDMtcSgVatWcaSatcttttVatag
ttactttacgatcaccNtaDVgSRcgVcgtgaacgaNtaNatatagtHtMgtHcMtagaa
attBgtataRaaaacaYKgtRccYtatgaagtaataKgtaaMttgaaRVatgcagaKStc
tHNaaatctBBtcttaYaBWHgtVtgacagcaRcataWctcaBcYacYgatDgtDHccta
>THREE Homo sapiens frequency
aacacttcaccaggtatcgtgaaggctcaagattacccagagaacctttgcaatataaga
atatgtatgcagcattaccctaagtaattatattctttttctgactcaaagtgacaagcc
ctagtgtatattaaatcggtatatttgggaaattcctcaaactatcctaatcaggtagcc
atgaaagtgatcaaaaaagttcgtacttataccatacatgaattctggccaagtaaaaaa
tagattgcgcaaaattcgtaccttaagtctctcgccaagatattaggatcctattactca
tatcgtgtttttctttattgccgccatccccggagtatctcacccatccttctcttaaag
gcctaatattacctatgcaaataaacatatattgttgaaaattgagaacctgatcgtgat
tcttatgtgtaccatatgtatagtaatcacgcgactatatagtgctttagtatcgcccgt
gggtgagtgaatattctgggctagcgtgagatagtttcttgtcctaatatttttcagatc
gaatagcttctatttttgtgtttattgacatatgtcgaaactccttactcagtgaaagtc
atgaccagatccacgaacaatcttcggaatcagtctcgttttacggcggaatcttgagtc
taacttatatcccgtcgcttactttctaacaccccttatgtatttttaaaattacgttta
ttcgaacgtacttggcggaagcgttattttttgaagtaagttacattgggcagactcttg
acattttcgatacgactttctttcatccatcacaggactcgttcgtattgatatcagaag
ctcgtgatgattagttgtcttctttaccaatactttgaggcctattctgcgaaatttttg
ttgccctgcgaacttcacataccaaggaacacctcgcaacatgccttcatatccatcgtt
cattgtaattcttacacaatgaatcctaagtaattacatccctgcgtaaaagatggtagg
ggcactgaggatatattaccaagcatttagttatgagtaatcagcaatgtttcttgtatt
aagttctctaaaatagttacatcgtaatgttatctcgggttccgcgaataaacgagatag
attcattatatatggccctaagcaaaaacctcctcgtattctgttggtaattagaatcac
acaatacgggttgagatattaattatttgtagtacgaagagatataaaaagatgaacaat
tactcaagtcaagatgtatacgggatttataataaaaatcgggtagagatctgctttgca
attcagacgtgccactaaatcgtaatatgtcgcgttacatcagaaagggtaactattatt
aattaataaagggcttaatcactacatattagatcttatccgatagtcttatctattcgt
tgtatttttaagcggttctaattcagtcattatatcagtgctccgagttctttattattg
ttttaaggatgacaaaatgcctcttgttataacgctgggagaagcagactaagagtcgga
gcagttggtagaatgaggctgcaaaagacggtctcgacgaatggacagactttactaaac
caatgaaagacagaagtagagcaaagtctgaagtggtatcagcttaattatgacaaccct
taatacttccctttcgccgaatactggcgtggaaaggttttaaaagtcgaagtagttaga
ggcatctctcgctcataaataggtagactactcgcaatccaatgtgactatgtaatactg
ggaacatcagtccgcgatgcagcgtgtttatcaaccgtccccactcgcctggggagacat
gagaccacccccgtggggattattagtccgcagtaatcgactcttgacaatccttttcga
ttatgtcatagcaatttacgacagttcagcgaagtgactactcggcgaaatggtattact
aaagcattcgaacccacatgaatgtgattcttggcaatttctaatccactaaagcttttc
cgttgaatctggttgtagatatttatataagttcactaattaagatcacggtagtatatt
gatagtgatgtctttgcaagaggttggccgaggaatttacggattctctattgatacaat
ttgtctggcttataactcttaaggctgaaccaggcgtttttagacgacttgatcagctgt
tagaatggtttggactccctctttcatgtcagtaacatttcagccgttattgttacgata
tgcttgaacaatattgatctaccacacacccatagtatattttataggtcatgctgttac
ctacgagcatggtattccacttcccattcaatgagtattcaacatcactagcctcagaga
tgatgacccacctctaataacgtcacgttgcggccatgtgaaacctgaacttgagtagac
gatatcaagcgctttaaattgcatataacatttgagggtaaagctaagcggatgctttat
ataatcaatactcaataataagatttgattgcattttagagttatgacacgacatagttc
actaacgagttactattcccagatctagactgaagtactgatcgagacgatccttacgtc
gatgatcgttagttatcgacttaggtcgggtctctagcggtattggtacttaaccggaca
ctatactaataacccatgatcaaagcataacagaatacagacgataatttcgccaacata
tatgtacagaccccaagcatgagaagctcattgaaagctatcattgaagtcccgctcaca
atgtgtcttttccagacggtttaactggttcccgggagtcctggagtttcgacttacata
aatggaaacaatgtattttgctaatttatctatagcgtcatttggaccaatacagaatat
tatgttgcctagtaatccactataacccgcaagtgctgatagaaaatttttagacgattt
ataaatgccccaagtatccctcccgtgaatcctccgttatactaattagtattcgttcat
acgtataccgcgcatatatgaacatttggcgataaggcgcgtgaattgttacgtgacaga
gatagcagtttcttgtgatatggttaacagacgtacatgaagggaaactttatatctata
gtgatgcttccgtagaaataccgccactggtctgccaatgatgaagtatgtagctttagg
tttgtactatgaggctttcgtttgtttgcagagtataacagttgcgagtgaaaaaccgac
gaatttatactaatacgctttcactattggctacaaaatagggaagagtttcaatcatga
gagggagtatatggatgctttgtagctaaaggtagaacgtatgtatatgctgccgttcat
tcttgaaagatacataagcgataagttacgacaattataagcaacatccctaccttcgta
acgatttcactgttactgcgcttgaaatacactatggggctattggcggagagaagcaga
tcgcgccgagcatatacgagacctataatgttgatgatagagaaggcgtctgaattgata
catcgaagtacactttctttcgtagtatctctcgtcctctttctatctccggacacaaga
attaagttatatatatagagtcttaccaatcatgttgaatcctgattctcagagttcttt
ggcgggccttgtgatgactgagaaacaatgcaatattgctccaaatttcctaagcaaatt
ctcggttatgttatgttatcagcaaagcgttacgttatgttatttaaatctggaatgacg
gagcgaagttcttatgtcggtgtgggaataattcttttgaagacagcactccttaaataa
tatcgctccgtgtttgtatttatcgaatgggtctgtaaccttgcacaagcaaatcggtgg
tgtatatatcggataacaattaatacgatgttcatagtgacagtatactgatcgagtcct
ctaaagtcaattacctcacttaacaatctcattgatgttgtgtcattcccggtatcgccc
gtagtatgtgctctgattgaccgagtgtgaaccaaggaacatctactaatgcctttgtta
ggtaagatctctctgaattccttcgtgccaacttaaaacattatcaaaatttcttctact
tggattaactacttttacgagcatggcaaattcccctgtggaagacggttcattattatc
ggaaaccttatagaaattgcgtgttgactgaaattagatttttattgtaagagttgcatc
tttgcgattcctctggtctagcttccaatgaacagtcctcccttctattcgacatcgggt
ccttcgtacatgtctttgcgatgtaataattaggttcggagtgtggccttaatgggtgca
actaggaatacaacgcaaatttgctgacatgatagcaaatcggtatgccggcaccaaaac
gtgctccttgcttagcttgtgaatgagactcagtagttaaataaatccatatctgcaatc
gattccacaggtattgtccactatctttgaactactctaagagatacaagcttagctgag
accgaggtgtatatgactacgctgatatctgtaaggtaccaatgcaggcaaagtatgcga
gaagctaataccggctgtttccagctttataagattaaaatttggctgtcctggcggcct
cagaattgttctatcgtaatcagttggttcattaattagctaagtacgaggtacaactta
tctgtcccagaacagctccacaagtttttttacagccgaaacccctgtgtgaatcttaat
atccaagcgcgttatctgattagagtttacaactcagtattttatcagtacgttttgttt
ccaacattacccggtatgacaaaatgacgccacgtgtcgaataatggtctgaccaatgta
ggaagtgaaaagataaatat`;

const regExps = [
        /agggtaaa|tttaccct/ig,
        /[cgt]gggtaaa|tttaccc[acg]/ig,
        /a[act]ggtaaa|tttacc[agt]t/ig,
        /ag[act]gtaaa|tttac[agt]ct/ig,
        /agg[act]taaa|ttta[agt]cct/ig,
        /aggg[acg]aaa|ttt[cgt]ccct/ig,
        /agggt[cgt]aa|tt[acg]accct/ig,
        /agggta[cgt]a|t[acg]taccct/ig,
        /agggtaa[cgt]|[acg]ttaccct/ig
];

for(let i=0;i<n;i++){
	for (let j = 0; j < regExps.length; j++) {
        	const re = regExps[j];
        	const m = data.match(re);
        	console.log(re.source, m ? m.length : 0);
	}
}
