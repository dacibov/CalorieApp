  async getDailySummariesLastNDays(n: number): Promise<DailySummary[]> {
    const sessionId = getSessionId();

    const today = new Date();
    const endDate = today.toISOString().split('T')[0];

    const start = new Date();
    start.setDate(start.getDate() - (n - 1));
    const startDate = start.toISOString().split('T')[0];

    const { data, error } = await supabase
      .from('daily_summaries')
      .select('*')
      .eq('session_id', sessionId)
      .gte('date', startDate)
      .lte('date', endDate)
      .order('date', { ascending: true });

    if (error) throw error;
    return data || [];
  },

