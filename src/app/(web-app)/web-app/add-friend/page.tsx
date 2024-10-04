import { validateRequest } from "@/app/lib/auth";
import AddFriendForm from "@/app/ui/add-friend/add-friend-form";
import { redirect } from "next/navigation";

export default async function AddFriend() {
  const { user } = await validateRequest();
	if (!user) {
		return redirect('/401');
	}
  
  return (
    <main className="grow h-screen flex flex-col overflow-hidden">
      <div className="px-12 py-10">
        <span className="text-4xl">Add Friend</span>
      </div>
      <AddFriendForm/>
    </main>
  );
}
