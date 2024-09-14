import AddFriendForm from "@/app/ui/add-friend/add-friend-form";

export default function AddFriend() {
  return (
    <main className="grow h-screen flex flex-col overflow-hidden">
      <div className="px-12 py-10">
        <span className="text-4xl">Add Friend</span>
      </div>
      <AddFriendForm/>
    </main>
  );
}
