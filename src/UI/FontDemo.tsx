import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function FontDemo() {
  return (
    <div>
      <section>
        <h2 className="text-2xl font-semibold mb-4  font-sans">
          Manrope Font (Sans-serif) Testing out Fonts
        </h2>
        <div className="space-y-3">
          <p className="text-5xl font-light">Light 300</p>
          <p className="text-5xl font-normal">Regular 400</p>
          <p className="text-5xl font-medium">Medium 500</p>
          <p className="text-5xl font-semibold">Semi-bold 600</p>
          <p className="text-5xl font-bold">Bold 700</p>
        </div>
        <Button className="cursor-pointer">Click me</Button>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-4 font-sans">
          Inconsolata Font (Monospace)
        </h2>
        <div className="space-y-3 font-mono bg-gray-100 p-4 rounded-lg">
          <p className="text-xl">// Code examples look great</p>
          <p className="text-xl">function learn() {"{"}</p>
          <p className="text-xl ml-4">return "Knowledge grows here";</p>
          <p className="text-xl">{"}"}</p>
          <p className="text-xl mt-2">const wisdom = learn();</p>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-4 font-sans">
          Combined Usage
        </h2>
        <div className="space-y-4">
          <p className="text-lg font-sans">
            This is Manrope - perfect for body text and headings.
          </p>
          <p className="text-lg font-mono bg-gray-100 p-3 rounded">
            This is Inconsolata - ideal for code snippets and technical content.
          </p>
        </div>
      </section>
    </div>
  );
}
