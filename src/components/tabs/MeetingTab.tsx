import React, { useState } from 'react';
import { MeetingRecord, FamilyMember } from '../../types';
import {
  Coffee,
  Calendar,
  User,
  Users,
  FileText,
  FileDown,
  Trash2,
  CheckCircle,
  Plus
} from 'lucide-react';

interface MeetingTabProps {
  meetings: MeetingRecord[];
  familyMembers: FamilyMember[];
  onSaveMeeting: (meeting: Omit<MeetingRecord, 'id'>) => void;
  onDeleteMeeting: (id: number) => void;
}

export const MeetingTab: React.FC<MeetingTabProps> = ({
  meetings,
  familyMembers,
  onSaveMeeting,
  onDeleteMeeting
}) => {
  const [meetingDate, setMeetingDate] = useState(() => {
    return new Date().toISOString().split('T')[0];
  });
  const [reporter, setReporter] = useState('');
  const [attendees, setAttendees] = useState<string[]>([]);
  const [issues, setIssues] = useState('');
  const [decisions, setDecisions] = useState('');
  const [treatNote, setTreatNote] = useState('Tavşan kanı çay ve fırından yeni çıkmış kurabiye');
  const [formError, setFormError] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Initialize attendees with all family members by default
  React.useEffect(() => {
    if (familyMembers.length > 0 && attendees.length === 0) {
      setAttendees(familyMembers.map((m) => m.name));
      if (!reporter) setReporter(familyMembers[0].name);
    }
  }, [familyMembers]);

  const toggleAttendee = (name: string) => {
    setAttendees((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!meetingDate || !reporter || !issues.trim() || !decisions.trim()) {
      setFormError('Lütfen tarih, raportör, gündem ve alınan kararlar alanlarını eksiksiz doldurun.');
      return;
    }

    setFormError('');
    onSaveMeeting({
      date: new Date(meetingDate).toLocaleDateString('tr-TR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }),
      reporter,
      attendees,
      issues: issues.trim(),
      decisions: decisions.trim(),
      treatNote: treatNote.trim() || undefined
    });

    setIssues('');
    setDecisions('');
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const exportToWord = (record: MeetingRecord) => {
    const attendeesStr = record.attendees.join(', ') || 'Tüm aile';
    const content = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset='utf-8'>
        <title>Aile Meclisi Toplantı Tutanağı</title>
        <style>
          body { font-family: 'Calibri', 'Arial', sans-serif; line-height: 1.6; color: #2D2426; }
          h1 { color: #854d0e; text-align: center; border-bottom: 2px solid #ca8a04; padding-bottom: 10px; }
          h2 { color: #78350f; margin-top: 24px; border-left: 4px solid #ca8a04; padding-left: 10px; }
          .meta-box { background: #fefce8; border: 1px solid #fef08a; padding: 12px; margin-bottom: 20px; }
          .section-content { background: #fdfaf6; padding: 15px; border-radius: 8px; margin-bottom: 15px; }
          .footer { text-align: right; margin-top: 40px; font-style: italic; color: #78716c; }
        </style>
      </head>
      <body>
        <h1>Haftalık Aile Toplantısı Tutanağı</h1>
        <div class="meta-box">
          <p><strong>Toplantı Tarihi:</strong> ${record.date}</p>
          <p><strong>Toplantı Raportörü:</strong> ${record.reporter}</p>
          <p><strong>Katılan Aile Üyeleri:</strong> ${attendeesStr}</p>
          ${record.treatNote ? `<p><strong>Meclis İkramı:</strong> ${record.treatNote}</p>` : ''}
        </div>

        <h2>1. Gündem: Aile İçi Sorunlar, İhtiyaçlar & Teşekkürler</h2>
        <div class="section-content">
          ${record.issues.replace(/\n/g, '<br>')}
        </div>

        <h2>2. Alınan Ortak Kararlar, Görevler & Çözümler</h2>
        <div class="section-content">
          ${record.decisions.replace(/\n/g, '<br>')}
        </div>

        <div class="footer">
          <p>Aile Bağları: "Aile Dediğin" Platformu tarafından kayıt altına alınmıştır.</p>
        </div>
      </body>
      </html>
    `;

    const blob = new Blob(['\ufeff', content], {
      type: 'application/msword'
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Aile_Meclisi_Tutanagi_${record.date.replace(/ /g, '_')}.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Warm Atmosphere Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 border border-amber-200/80 p-8 sm:p-10 shadow-2xs">
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-800 mb-2">
            <Coffee className="w-4 h-4 text-amber-700" />
            <span>Haftalık Aile Meclisi</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-amber-950 leading-tight">
            Çay, Ihlamur & Kurabiye Eşliğinde
          </h1>

          <p className="mt-3 text-sm sm:text-base text-amber-900/80 leading-relaxed font-normal">
            Haftada bir gün sofrada bir araya gelip kalplerimizi açıyoruz. Bu hafta neleri iyi yaptık,
            hangi konularda zorlandık ve birbirimize nasıl destek olabiliriz? Kararlarımızı sevgiyle
            kayıt altına alıyoruz.
          </p>
        </div>

        <div className="hidden md:flex items-center gap-4 absolute right-10 top-1/2 -translate-y-1/2 text-amber-300/40">
          <Coffee className="w-36 h-36" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Meeting Minutes Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-stone-200/90 shadow-2xs overflow-hidden">
          <div className="p-6 bg-stone-50/80 border-b border-stone-200/80 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-amber-700" />
              <h2 className="font-serif text-lg font-bold text-stone-900">
                Yeni Toplantı Tutanağı
              </h2>
            </div>
            <span className="text-xs text-stone-500">
              Meclis Kararları
            </span>
          </div>

          <form onSubmit={handleSave} className="p-6 sm:p-8 space-y-6">
            {formError && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800">
                {formError}
              </div>
            )}

            {saveSuccess && (
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Toplantı tutanağı başarıyla kaydedildi ve geçmişe eklendi!</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Meeting Date */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-amber-700" />
                  <span>Toplantı Tarihi</span>
                </label>
                <input
                  type="date"
                  value={meetingDate}
                  onChange={(e) => setMeetingDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-600/15 focus:border-amber-600 text-stone-800"
                />
              </div>

              {/* Reporter */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-amber-700" />
                  <span>Raportör (Yazan Kişi)</span>
                </label>
                <select
                  value={reporter}
                  onChange={(e) => setReporter(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-600/15 focus:border-amber-600 text-stone-800"
                >
                  <option value="">Aile üyesi seçin...</option>
                  {familyMembers.map((m) => (
                    <option key={m.id} value={m.name}>
                      {m.name} {m.role ? `(${m.role})` : ''}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Attendance Selection */}
            {familyMembers.length > 0 && (
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-amber-700" />
                  <span>Toplantıya Katılan Aile Fertleri</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {familyMembers.map((member) => {
                    const isAttending = attendees.includes(member.name);
                    return (
                      <button
                        key={member.id}
                        type="button"
                        onClick={() => toggleAttendee(member.name)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors flex items-center gap-1.5 ${
                          isAttending
                            ? 'bg-amber-100 text-amber-900 border-amber-300 font-semibold'
                            : 'bg-stone-50 text-stone-500 border-stone-200 hover:bg-stone-100'
                        }`}
                      >
                        <CheckCircle
                          className={`w-3.5 h-3.5 ${
                            isAttending ? 'text-amber-800' : 'text-stone-300'
                          }`}
                        />
                        <span>{member.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Issues & Needs */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold uppercase tracking-wider text-stone-700">
                  Gündem: Aile İçi Sorunlar, İhtiyaçlar & Teşekkürler
                </label>
                <span className="text-[11px] text-amber-800">
                  Ben Dili kullanmaya özen gösterin
                </span>
              </div>
              <textarea
                value={issues}
                onChange={(e) => setIssues(e.target.value)}
                rows={4}
                placeholder="Örn: Bu hafta okul ve iş telaşı sebebiyle hepimiz biraz yorulduk. Akşam sofrayı toplarken birbirimize daha çok yardım edebiliriz. Ayrıca anneye lezzetli yemekleri için teşekkür ettik..."
                className="w-full p-3.5 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-600/15 focus:border-amber-600 text-stone-800 resize-none leading-relaxed"
              />
            </div>

            {/* Decisions Taken */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-stone-700">
                Alınan Ortak Kararlar & Çözümler
              </label>
              <textarea
                value={decisions}
                onChange={(e) => setDecisions(e.target.value)}
                rows={4}
                placeholder="Örn: 1. Akşam yemeklerinden sonra telefonlar saat 21:00'e kadar kutuda bekletilecek.&#10;2. Bulaşık makinesini boşaltma işi sırayla yapılacak.&#10;3. Cumartesi günü ailecek doğa yürüyüşüne çıkılacak."
                className="w-full p-3.5 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-600/15 focus:border-amber-600 text-stone-800 resize-none leading-relaxed"
              />
            </div>

            {/* Treat note */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-stone-700">
                Toplantı İkramı (Günün Lezzeti)
              </label>
              <input
                type="text"
                value={treatNote}
                onChange={(e) => setTreatNote(e.target.value)}
                placeholder="Örn: Ihlamur çayı ve tarçınlı kurabiye"
                className="w-full px-3.5 py-2.5 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-600/15 focus:border-amber-600 text-stone-800"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-sm font-semibold transition-all shadow-xs flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Toplantı Tutanağını Kaydet</span>
            </button>
          </form>
        </div>

        {/* Meeting History Timeline */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-3xl border border-stone-200/90 shadow-2xs p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <Coffee className="w-4 h-4 text-amber-700" />
                <h3 className="font-serif text-base font-bold text-stone-900">
                  Geçmiş Toplantı Tutanakları
                </h3>
              </div>
              <span className="text-xs text-stone-500 tabular-nums">
                {meetings.length} Toplantı
              </span>
            </div>

            <div className="space-y-4 max-h-[700px] overflow-y-auto pr-1">
              {meetings.length === 0 ? (
                <div className="text-center py-14 border border-dashed border-stone-200 rounded-2xl p-6 text-stone-400 space-y-2">
                  <Coffee className="w-8 h-8 mx-auto text-amber-600/40" />
                  <p className="font-serif text-base text-stone-600">Henüz toplantı kaydı yok.</p>
                  <p className="text-xs leading-relaxed max-w-xs mx-auto">
                    Çayınızı demleyin, kurabiyelerinizi alın ve sol taraftaki form ile ilk aile meclisinizi
                    kaydedin!
                  </p>
                </div>
              ) : (
                meetings.map((meeting) => (
                  <div
                    key={meeting.id}
                    className="p-5 rounded-2xl bg-stone-50/80 border border-stone-200/80 space-y-3 relative group"
                  >
                    <div className="flex items-start justify-between gap-2 border-b border-stone-200/60 pb-2.5">
                      <div>
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-900">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{meeting.date}</span>
                        </div>
                        <p className="text-[11px] text-stone-500 mt-0.5">
                          Raportör: <strong>{meeting.reporter}</strong>
                        </p>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => exportToWord(meeting)}
                          className="px-2.5 py-1 text-xs font-medium text-amber-800 hover:text-amber-950 bg-amber-100/70 hover:bg-amber-200/70 rounded-lg transition-colors flex items-center gap-1"
                          title="Word Belgesi (.doc) Olarak İndir"
                        >
                          <FileDown className="w-3.5 h-3.5" />
                          <span>Word</span>
                        </button>

                        <button
                          onClick={() => onDeleteMeeting(meeting.id)}
                          className="p-1 text-stone-300 hover:text-rose-600 rounded-lg transition-colors"
                          title="Tutanağı Sil"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {meeting.attendees.length > 0 && (
                      <div className="text-[11px] text-stone-500 flex items-center gap-1 flex-wrap">
                        <span className="font-medium text-stone-600">Katılanlar:</span>
                        <span>{meeting.attendees.join(', ')}</span>
                      </div>
                    )}

                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
                        Gündem & Paylaşımlar:
                      </span>
                      <p className="text-xs text-stone-700 bg-white p-2.5 rounded-xl border border-stone-200/60 leading-relaxed">
                        {meeting.issues}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 block">
                        Alınan Kararlar:
                      </span>
                      <p className="text-xs text-stone-800 bg-amber-50/70 p-2.5 rounded-xl border border-amber-200/60 leading-relaxed font-medium">
                        {meeting.decisions}
                      </p>
                    </div>

                    {meeting.treatNote && (
                      <p className="text-[11px] text-stone-400 italic">
                        ☕ İkram: {meeting.treatNote}
                      </p>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
