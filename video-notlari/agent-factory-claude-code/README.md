# Claude Code'un perde arkası — Agent Factory

**Kaynak:** Google Cloud "Agent Factory" podcast
**Konuklar:** Lydia Hallie (Anthropic, Claude Code ekibi) · YK Sugi (CS Dojo, Claude Code Tips)
**Süre:** 61 dakika · 7 bölüm · 45 teknik not

Claude Code'un içeride nasıl çalıştığı anlatılıyor: model neyi görüyor, harness ne yapıyor, izinler hangi katmanda duruyor. Sohbet ve demo kısımları değil, **içindeki teknik bilgi** çıkarıldı.

## Kartlar

| Kart | Konu | Format |
|---|---|---|
| [01](gorseller/OFD-CC-01.png) | model stateless + model tool çalıştırmıyor | karşılaştırma 16:9 |
| [02](gorseller/OFD-CC-02.png) | enter'a bastığın an prompt nasıl derleniyor | liste 4:5 |
| [03](gorseller/OFD-CC-03.png) | agentic loop | süreç şeridi 16:9 |
| [04](gorseller/OFD-CC-04.png) | permissions — allow / ask / deny + ayar hiyerarşisi | liste 4:5 |
| [05](gorseller/OFD-CC-05.png) | skills — frontmatter ayarları | kod kartı 16:9 |
| [06](gorseller/OFD-CC-06.png) | auto mode — permission fatigue'in çözümü | karşılaştırma 16:9 |
| [07](gorseller/OFD-CC-07.png) | dynamic workflows — subagent'ları deterministik yapmak | liste 4:5 |
| [08](gorseller/OFD-CC-08.png) | pratik tipler 1/2 | liste 4:5 |
| [09](gorseller/OFD-CC-09.png) | pratik tipler 2/2 | liste 4:5 |
| [10](gorseller/OFD-CC-10.png) | zihniyet: iş artık kod yazmak değil | liste 4:5 |

## Bölümler

Altyazı dosyaları [`altyazilar/`](altyazilar/) altında, videodaki sırayla:

| # | Bölüm | Süre |
|---|---|---|
| 01 | Claude Code iç yapı | 15:21 |
| 02 | Podcast açılışı + intent-driven development | 5:57 |
| 03 | Demo: YK — sapan oyunu | 13:30 |
| 04 | Demo: Lydia — auto mode + dynamic workflows | 12:18 |
| 05 | Tartışma: craft ve review | 8:42 |
| 06 | Kod dışı kullanım | 3:27 |
| 07 | Rapid fire | 1:36 |

## Öne çıkanlar

**Model hiçbir şey hatırlamıyor.** Oturum içi ve çağrılar arası hafızası yok; her çağrıda sıfırdan başlıyor. Tüm state'i harness tutuyor. Model tool da çalıştırmıyor — sadece "bu tool'u çalıştır" sinyali üretiyor, asıl işi harness yapıyor. İzinlerin işe yaramasının sebebi bu.

**Auto mode, allow ve deny listesinin arasında duruyor.** Her tool call'dan önce ayrı bir classifier çalışıyor: bu tehlikeli mi? Bağlama duyarlı — `rm -rf` normalde tehlikeli, ama sen silmesini istediysen sormuyor.

**Dynamic workflow, subagent non-determinizmini kodla sabitliyor.** Claude arkada bir JavaScript dosyası üretiyor; kaydettiğin an slash command oluyor ve her çağrıda birebir aynı subagent'ları çalıştırıyor.

**Review %10'dan %90'a çıktı.** El ile yazarken review'ün çoğu yazarken oluyordu — kodu zaten okuyordun. Şimdi iş büyük ölçüde review. Videonun asıl tezi bu.
