import SearchBox from '@/components/SearchBox';
import StockTitle from '@/components/StockTitle'

export default function Home() {
  return (
    <>
      <div className="h-20 w-full bg-[var(--color-surface)]">
        <SearchBox />
      </div>
      <div className="flex justify-center pt-3">
        <StockTitle />
      </div>
    </>
  );
}
