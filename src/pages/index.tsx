/* eslint-disable @typescript-eslint/no-explicit-any */
import { round } from 'mathjs';
import Link from 'next/link';
import * as React from 'react';
import { RiLinksFill } from 'react-icons/ri';
import { useDispatch } from 'react-redux';

import { BaseCard } from '@/components/cards';
import Layout from '@/components/layout/Layout';
import UnstyledLink from '@/components/links/UnstyledLink';
import Seo from '@/components/Seo';

import { setId } from '@/features/app';
import { CoinGeckoAPI } from '@/utils/apis/coinGecko';

export default function HomePage({ data }: any) {
  const dispatch = useDispatch();

  const handleId = (value: string) => dispatch(setId(value));

  return (
    <Layout>
      <Seo />

      <main className=''>
        <section className=''>
          <div className='flex min-h-screen flex-col'>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
              <div className='col-span-2 flex w-full flex-col gap-y-4'>
                <BaseCard className='max-h-[40vh] min-h-[40vh] w-full !overflow-y-scroll'>
                  <div className='flex flex-col gap-y-10'>
                    <div className='h2 text-white'>Market Leaders</div>

                    <div className='flex flex-col gap-y-6'>
                      {data.trendingCoins.coins.map((coin: any, j: number) => (
                        <BaseCard
                          key={j}
                          leftBorder
                          className='max-h-[5rem] min-h-[5rem] w-full items-center justify-center !gap-y-6 overflow-y-scroll !bg-base text-white'
                        >
                          <div className='flex w-full flex-row justify-between'>
                            <div className='my-auto'>
                              {coin.item.name} {`(${coin.item.symbol})`}
                            </div>
                            <div className='my-auto'>chart</div>
                            <div className='h3 my-auto'>
                              ${round(coin.item.price_btc * data.btcPrice, 5)}
                            </div>
                          </div>
                        </BaseCard>
                      ))}
                    </div>
                  </div>
                </BaseCard>

                <BaseCard className='max-h-[40vh] min-h-[40vh] w-full !overflow-y-scroll'>
                  <div className='flex flex-col gap-y-10'>
                    <div className='h2 text-white'>All Coins</div>

                    <div className='all_coins_grid gap-10'>
                      {data.allCoins.map(
                        (
                          coin: {
                            id: any;
                            name: string | any[];
                            symbol: string | any[];
                          },
                          j: React.Key | null | undefined
                        ) => (
                          <Link key={j} href={`/${coin.id}`}>
                            <BaseCard
                              onClick={() => handleId(coin.id)}
                              className='!max-h-[5rem] max-w-[20rem] items-center justify-center !bg-base text-white'
                            >
                              <div className='flex gap-2'>
                                <div className='truncate'>
                                  {coin.name.slice(0, 6)}
                                </div>
                                <div className='truncate'>{`(${coin.symbol.slice(
                                  0,
                                  6
                                )})`}</div>
                              </div>
                            </BaseCard>
                          </Link>
                        )
                      )}
                    </div>
                  </div>
                </BaseCard>
              </div>

              <div className='flex h-full flex-col'>
                <BaseCard className='max-h-[82vh] !overflow-y-scroll'>
                  <div className='flex flex-col gap-y-6'>
                    <div className='h4 text-white'>Events</div>

                    <div className='flex flex-col gap-y-4'>
                      {Array(9)
                        .fill(0)
                        .map((i, j) => (
                          <BaseCard
                            key={j}
                            className='overflow- relative max-h-[10rem] min-h-[10rem] overflow-hidden !bg-base !py-4 text-white'
                          >
                            <>
                              <div className='flex max-h-[15vh] flex-col gap-y-4'>
                                <div className='font-semibold'>
                                  Tokenavds London
                                </div>
                                <div className='overflow-hidden text-sm'>
                                  Lorem ipsum dolor sit amet consectetur,
                                  adipisicing elit. Architecto nam cumque
                                  distinctio ea accusamus rerum? Animi accusamus
                                  in, blanditiis saepe illum deserunt.
                                  Praesentium enim quo pariatur illo nihil ut
                                  quas maiores id incidunt rerum dolores
                                  eligendi vel, nemo totam delectus?
                                </div>
                              </div>

                              <UnstyledLink openNewTab href='/'>
                                <div className='absolute right-2 bottom-2 rounded-lg bg-content p-2'>
                                  <RiLinksFill className='h-5 w-5 text-blue-600' />
                                </div>
                              </UnstyledLink>
                            </>
                          </BaseCard>
                        ))}
                    </div>
                  </div>
                </BaseCard>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}

export async function getServerSideProps() {
  const trendingCoins = await CoinGeckoAPI.trendingCoins();
  const allCoins = await CoinGeckoAPI.allCoins();
  const btcTicker = await CoinGeckoAPI.getTickers('bitcoin');
  const btcPrice = btcTicker.tickers[0].last;

  return {
    props: {
      data: {
        trendingCoins,
        allCoins,
        btcPrice,
      },
    },
  };
}
