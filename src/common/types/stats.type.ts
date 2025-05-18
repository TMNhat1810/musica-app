export type Statistics = {
  User: {
    user_id: string;
    media_count: number;
    total_view_count: number;
    total_watch_seconds: number;
    total_watch_hours: number;
    average_watch_time_per_media: number;
  };
  Media: {
    media_id: string;
    view_count: string;
    total_watch_seconds: number;
    total_watch_hours: number;
    average_watch_time: number;
  };
};
