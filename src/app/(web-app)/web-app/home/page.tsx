import { validateRequest } from "@/app/lib/auth";
import CardGrid, { Card } from "@/app/ui/cards";
import { redirect } from "next/navigation";


export default async function Home() {
  const { user } = await validateRequest();
	if (!user) {
		return redirect('/401');
	}

  return (
    <main className="grow h-screen flex flex-col overflow-hidden">
      <div className="px-12 py-10">
        <span className="text-4xl">Home</span>
      </div>
      <CardGrid>
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
      </CardGrid>
    </main>
  );
}
