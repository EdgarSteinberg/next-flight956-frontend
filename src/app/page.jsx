import Card from "../components/card/card";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1>Bienvenido a la página de productos</h1>
      <Card title="Hola" description="mundo" />
    </div>
  );
}
