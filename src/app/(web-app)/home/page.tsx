import CardGrid, { Card } from "@/app/ui/cards";

export default function Home() {
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
