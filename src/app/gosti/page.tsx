import { db } from "@/firebase/config";
import { collection, getDocs } from "firebase/firestore";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Invite } from "@/types/types";

async function getFirebaseData() {
  const invitesRef = collection(db, "invites");
  const invitesSnapshot = await getDocs(invitesRef);
  const invites = invitesSnapshot.docs.map((doc) => doc.data());
  return invites as Invite[];
}

export default async function Gosti() {
  const data = await getFirebaseData();

  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 xl:max-w-5xl xl:px-0 mt-20">
      <Table>
        <TableCaption>Lista gostiju koji su odgovorili</TableCaption>
        <TableHeader>
          <TableRow className="bg-slate-200">
            <TableHead>Gosti</TableHead>
            <TableHead>Poruka</TableHead>
            <TableHead className="w-[100px]">Smjestaj Potreban</TableHead>
            <TableHead className="text-right">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((invite) => (
            <TableRow key={invite.id} className="hover:bg-slate-50">
              <TableCell className="font-medium">{invite.guests}</TableCell>
              <TableCell>{invite.poruka}</TableCell>
              <TableCell>{invite.smjestaj ? "Da" : "Ne"}</TableCell>
              <TableCell className="text-right">{invite.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export const revalidate = 0;