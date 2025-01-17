import CategoryFilter from '@/components/shared/CategoryFilter';
import Collection from '@/components/shared/Collection';
import Search from '@/components/shared/Search';
import { Button } from '@/components/ui/button';
import { getAllEvents } from '@/lib/actions/event.actions';
import { SearchParamProps } from '@/types';
import Image from 'next/image';
import Link from 'next/link';

export default async function Home({ searchParams }: SearchParamProps) {
  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || '';
  const category = (searchParams?.category as string) || '';

  const events = await getAllEvents({
    query: searchText,
    category,
    page,
    limit: 6,
  });

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-yellow-50 py-12 md:py-20">
        <div className="wrapper grid grid-cols-1 md:grid-cols-2 items-center gap-12">
          {/* Hero Text */}
          <div className="flex flex-col gap-8">
            <h1 className="text-5xl font-bold text-green-900 md:text-6xl">
              Your Event, Your Way: Let Us Help You Shine!
            </h1>
            <p className="text-base text-gray-700 md:text-lg">
              Join a vibrant community of 4000+ mentors from industry-leading companies and take your events to the next level.
            </p>
            <Button size="lg" asChild className="px-8 py-4">
              <Link href="#events">Get Started</Link>
            </Button>
          </div>

          {/* Hero Image */}
          <Image
          src="/public/assets/images/new.jpeg"
            alt="event showcase"
            width={900}
            height={700}
            className="rounded-2xl shadow-md object-cover"
          />
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className="wrapper py-14 md:py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-green-900 md:text-5xl">
            Discover Events That Inspire
          </h2>
          <p className="text-gray-700 md:text-lg mt-4">
            Explore a curated list of events tailored to your interests.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <Search className="w-full md:w-2/3" />
          <CategoryFilter className="w-full md:w-1/3" />
        </div>

        {/* Events Collection */}
        <div className="mt-12">
          <Collection
            data={events?.data}
            emptyTitle="No Events Found"
            emptyStateSubtext="We couldn't find any events at the moment. Please check back later."
            collectionType="All_Events"
            limit={6}
            page={page}
            totalPages={events?.totalPages}
          />
        </div>
      </section>
    </>
  );
}
