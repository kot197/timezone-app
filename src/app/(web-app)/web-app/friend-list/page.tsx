import { validateRequest } from "@/app/lib/auth";
import FriendsTable, { FriendsTableRow } from "@/app/ui/friend-list/table";
import { redirect } from "next/navigation";

export default async function FriendList() {
  const { user } = await validateRequest();
	if (!user) {
		return redirect('/401');
	}
  
  return (
    <main className="grow h-screen flex flex-col overflow-hidden">
      <div className="px-12 py-10">
        <span className="text-4xl">Friend List</span>
      </div>
      <FriendsTable>
        <FriendsTableRow></FriendsTableRow>
        <FriendsTableRow></FriendsTableRow>
        <FriendsTableRow></FriendsTableRow>
        <FriendsTableRow></FriendsTableRow>
      </FriendsTable>
    </main>
  );
}
