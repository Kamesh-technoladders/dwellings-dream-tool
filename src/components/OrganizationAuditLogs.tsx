
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { OrganizationAuditLog } from "@/types/organization";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";

interface OrganizationAuditLogsProps {
  organizationId: string;
}

export function OrganizationAuditLogs({ organizationId }: OrganizationAuditLogsProps) {
  const [logs, setLogs] = useState<OrganizationAuditLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAuditLogs = async () => {
      try {
        const { data, error } = await supabase
          .from('organization_audit_logs')
          .select('*')
          .eq('organization_id', organizationId)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setLogs(data);
      } catch (error) {
        console.error('Error fetching audit logs:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAuditLogs();
  }, [organizationId]);

  if (isLoading) {
    return <div>Loading audit logs...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Status Change History</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px]">
          {logs.length === 0 ? (
            <p className="text-muted-foreground text-sm">No status changes recorded yet.</p>
          ) : (
            <div className="space-y-4">
              {logs.map((log) => (
                <div key={log.id} className="border-b pb-4 last:border-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">
                        Status changed from{' '}
                        <span className="text-muted-foreground">{log.old_status || 'initial'}</span>
                        {' '}to{' '}
                        <span className="font-semibold">{log.new_status}</span>
                      </p>
                      {log.reason && (
                        <p className="text-sm text-muted-foreground mt-1">
                          Reason: {log.reason}
                        </p>
                      )}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {new Date(log.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
