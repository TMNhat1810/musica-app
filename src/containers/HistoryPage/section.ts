import dayjs from 'dayjs';

type SectionKey =
  | 'Today'
  | 'Yesterday'
  | 'This Week'
  | 'This Month'
  | 'This Year'
  | 'Older';

export const sectionOrder: SectionKey[] = [
  'Today',
  'Yesterday',
  'This Week',
  'This Month',
  'This Year',
  'Older',
];

export function groupLogsByDate<T extends { created_at: string }>(logs: T[]) {
  const sections: Record<SectionKey, T[]> = {
    Today: [],
    Yesterday: [],
    'This Week': [],
    'This Month': [],
    'This Year': [],
    Older: [],
  };

  const now = dayjs();

  for (const log of logs) {
    const date = dayjs(log.created_at);

    if (date.isToday()) {
      sections.Today.push(log);
    } else if (date.isYesterday()) {
      sections.Yesterday.push(log);
    } else if (date.isSameOrAfter(now.startOf('week'))) {
      sections['This Week'].push(log);
    } else if (date.isSame(now, 'month')) {
      sections['This Month'].push(log);
    } else if (date.isSame(now, 'year')) {
      sections['This Year'].push(log);
    } else {
      sections.Older.push(log);
    }
  }

  return sections;
}
