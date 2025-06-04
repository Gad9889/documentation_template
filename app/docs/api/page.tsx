import { Table, TBody, TD, TH, THead, TR } from '../../../components/ui/table';

export default function ApiReference() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">API Reference</h1>
      <Table>
        <THead>
          <TR>
            <TH>Endpoint</TH>
            <TH>Method</TH>
            <TH>Description</TH>
          </TR>
        </THead>
        <TBody>
          <TR>
            <TD>/api/users</TD>
            <TD>GET</TD>
            <TD>List users</TD>
          </TR>
          <TR>
            <TD>/api/users</TD>
            <TD>POST</TD>
            <TD>Create user</TD>
          </TR>
        </TBody>
      </Table>
    </div>
  );
}
