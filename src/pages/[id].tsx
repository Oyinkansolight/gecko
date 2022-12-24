/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  CategoryScale,
  Chart as ChartJS,
  ChartOptions,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import commaNumber from 'comma-number';
import { number, round } from 'mathjs';
import * as React from 'react';
import { useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  RiArrowRightLine,
  RiGithubFill,
  RiGlobalLine,
  RiLineChartLine,
  RiRedditFill,
} from 'react-icons/ri';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import clsxm from '@/lib/clsxm';

import Button from '@/components/buttons/Button';
import { BaseCard } from '@/components/cards';
import Layout from '@/components/layout/Layout';
import UnstyledLink from '@/components/links/UnstyledLink';
import NextImage from '@/components/NextImage';
import Seo from '@/components/Seo';

import { CoinGeckoAPI } from '@/utils/apis/coinGecko';

import {
  updateBuyAmount,
  updateBuyCurrency,
  updateCurrentCoinHistory,
  updateSellAmount,
  updateSellCurrency,
} from '../features/app';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options: ChartOptions<'line'> = {
  responsive: true,
  // aspectRatio: 10,
  plugins: {
    legend: {
      display: false,
    },
  },
  maintainAspectRatio: false,
};

const labels = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

// const labels = [];

export default function CoinPage({ data }: any) {
  const dispatch = useDispatch();
  const app = useSelector((state: any) => state.app);

  useEffect(() => {
    dispatch(updateCurrentCoinHistory(data.coinHistory));

    //! History Data Date
    // console.log(moment.unix(data.coinHistory[0][0]).month());
  }, [data.coinHistory, dispatch]);

  const convertCurrency = () => {
    const rates = data.exchangeRates;

    const buyResult = round(
      (app.buyAmount * rates[app.sellCurrency].value) /
        rates[app.buyCurrency].value,
      6
    );
    const sellResult = round(
      (app.sellAmount * rates[app.buyCurrency].value) /
        rates[app.sellCurrency].value,
      6
    );

    if (app.buyAmount === 0) {
      dispatch(updateBuyAmount(sellResult));
    } else {
      dispatch(updateSellAmount(buyResult));
    }
  };

  const handleSellChange = (value: number) => {
    dispatch(updateBuyAmount(0));
    dispatch(updateSellAmount(value));
  };

  const handleBuyChange = (value: number) => {
    dispatch(updateSellAmount(0));
    dispatch(updateBuyAmount(value));
  };

  const handleSellCurrency = (value: string) =>
    dispatch(updateSellCurrency(value));
  const handleBuyCurrency = (value: string) =>
    dispatch(updateBuyCurrency(value));

  if (!app.currentCoinHistory) return <div>Loading...</div>;

  const customTime = app.currentCoinHistory.length < 366 ? 30 : 24;

  //! Range of dates to be calculated after converting unix time on
  //! dates and months extracted from the history data by dividing
  //! history length by 24 for data < 91 days (hourly) and multiplying by 30 for over 90 (not the final solution)

  const chartData = {
    labels,
    datasets: [
      {
        data: labels.map((i, j) => {
          if (j === 0) {
            return app.currentCoinHistory[0][1];
          } else {
            return app.currentCoinHistory[j * customTime][1];
          }
        }),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  return (
    <Layout date>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />

      <main className=''>
        <section className=''>
          <div className='flex min-h-screen flex-col'>
            <div className='grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-4'>
              <div className='col-span-2 flex w-full flex-col gap-y-4'>
                <BaseCard className='max-h-[45vh] min-h-[45vh] w-full !overflow-y-scroll'>
                  <div className='flex flex-col gap-y-10'>
                    <div className='flex flex-row gap-x-10'>
                      <div className='h3 my-auto text-white'>
                        $
                        {commaNumber(
                          round(
                            data.coinData?.market_data?.current_price?.usd,
                            2
                          )
                        )}
                      </div>

                      <div
                        className={clsxm(
                          data.coinData?.market_data?.price_change_24h > 0
                            ? 'text-green-500'
                            : 'text-red-500',
                          'my-auto flex gap-6'
                        )}
                      >
                        {data.coinData?.market_data?.price_change_24h > 0
                          ? `+${commaNumber(
                              round(
                                data.coinData?.market_data?.price_change_24h,
                                2
                              )
                            )}%`
                          : `${commaNumber(
                              round(
                                data.coinData?.market_data?.price_change_24h,
                                2
                              )
                            )}%`}{' '}
                        <span>
                          <RiLineChartLine className='text-6 h-6' />
                        </span>
                      </div>
                    </div>

                    <div className='flex max-h-[30vh] flex-col gap-y-6'>
                      <Line
                        height={50}
                        width={100}
                        data={chartData}
                        options={options}
                      />
                    </div>
                  </div>
                </BaseCard>

                <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
                  <div className='col-span-2'>
                    <BaseCard
                      leftBorder
                      leftBorderBg='!bg-blue-500'
                      className='max-h-[35vh] min-h-[35vh] w-full min-w-[40vw] !overflow-hidden'
                    >
                      <div className='flex flex-col gap-y-6'>
                        <div className='h4 text-white'>Exchange</div>

                        <div className='flex flex-col gap-y-6 text-white'>
                          <div className='grid grid-cols-3'>
                            <div className='col-span-2 flex flex-row gap-x-2 lg:gap-x-10'>
                              <div className='my-auto text-xs'>Sell</div>
                              <div className='h3 my-auto'>
                                <input
                                  placeholder='6700'
                                  value={app.sellAmount}
                                  onChange={(e) => {
                                    const val = number(e.target.value);
                                    if (!isNaN(val)) {
                                      handleSellChange(val);
                                    }
                                  }}
                                  className='h3 my-auto max-w-[15rem] rounded-lg bg-content p-1'
                                />
                              </div>
                            </div>

                            <select
                              onChange={(e) =>
                                handleSellCurrency(e.target.value)
                              }
                              className='my-auto block min-w-[6rem] rounded-lg bg-[#1D1923] p-2.5 text-lg text-white'
                            >
                              {Object.keys(data.exchangeRates)
                                .filter(
                                  (curr) =>
                                    data.exchangeRates[curr].type === 'fiat'
                                )
                                .map((curr, i) => (
                                  <option
                                    selected={app.sellCurrency === curr}
                                    key={i}
                                    value={curr}
                                  >
                                    {curr}
                                  </option>
                                ))}
                            </select>
                          </div>

                          <div className='grid grid-cols-3'>
                            <div className='col-span-2 flex flex-row gap-x-10'>
                              <div className='my-auto text-xs'>Buy</div>
                              <input
                                placeholder='0.06700'
                                value={app.buyAmount}
                                onChange={(e) => {
                                  const val = number(e.target.value);
                                  if (!isNaN(val)) {
                                    handleBuyChange(val);
                                  }
                                }}
                                className='h3 my-auto max-w-[15rem] rounded-lg bg-content p-1'
                              />
                            </div>

                            <select
                              onChange={(e) =>
                                handleBuyCurrency(e.target.value)
                              }
                              className='my-auto block min-w-[6rem] rounded-lg bg-[#1D1923] p-2.5 text-lg text-white'
                            >
                              {Object.keys(data.exchangeRates)
                                .filter(
                                  (curr) =>
                                    data.exchangeRates[curr].type === 'crypto'
                                )
                                .map((curr, i) => (
                                  <option
                                    selected={app.buyCurrency === curr}
                                    key={i}
                                    value={curr}
                                  >
                                    {curr}
                                  </option>
                                ))}
                            </select>
                          </div>
                        </div>

                        <div className='flex flex-row justify-between'>
                          <div className='my-auto flex flex-row gap-2 text-gray-600'>
                            <div>1BTC</div>
                            <div>=</div>
                            <div>
                              {commaNumber(
                                round(
                                  data.coinData?.market_data?.current_price
                                    ?.usd,
                                  2
                                )
                              )}{' '}
                              USD
                            </div>
                          </div>

                          <Button
                            onClick={convertCurrency}
                            className='rounded-xl'
                          >
                            <div className='flex flex-row gap-10 text-xs'>
                              <div className='my-auto'>Exchange</div>
                              <div className='my-auto'>
                                <RiArrowRightLine className='h-6 w-6' />
                              </div>
                            </div>
                          </Button>
                        </div>
                      </div>
                    </BaseCard>
                  </div>

                  <div className='mx-auto self-end'>
                    <BaseCard
                      leftBorder
                      leftBorderBg='!bg-blue-500'
                      className='max-h-[15vh] min-h-[15vh] w-full min-w-[15vw] !p-2'
                    >
                      <div className='flex flex-col items-center justify-center gap-y-6'>
                        <div className='h4 text-white'>Alexa Rank</div>
                        <div className='h3 text-white'>
                          {commaNumber(
                            data.coinData?.public_interest_stats?.alexa_rank
                          )}
                        </div>
                      </div>
                    </BaseCard>
                  </div>
                </div>
              </div>

              <div className='flex h-full flex-col'>
                <BaseCard className='max-h-[82vh] !overflow-y-scroll'>
                  <>
                    <div className='flex flex-col gap-y-6'>
                      <div className='h4 text-white'>Info Card</div>

                      <div className='flex flex-col gap-y-10'>
                        <BaseCard className='overflow- relative max-h-[10rem] min-h-[10rem] overflow-hidden !bg-base !py-4 text-white'>
                          <>
                            <div className='flex max-h-[15vh] flex-col gap-y-4'>
                              <div className='font-semibold'>Description:</div>
                              <div className='overflow-hidden text-sm'>
                                {data.coinData?.description?.en}
                              </div>
                            </div>
                          </>
                        </BaseCard>

                        <div className='flex flex-row items-center justify-center gap-x-6'>
                          {data.coinData?.links?.homepage[0] && (
                            <UnstyledLink
                              openNewTab
                              href={data.coinData?.links?.homepage[0]}
                            >
                              <div className='flex gap-2 overflow-hidden rounded-xl bg-gray-800 py-3 px-3'>
                                <div className='text-white'>Website</div>

                                <RiGlobalLine className='h-6 w-6 text-base' />
                              </div>
                            </UnstyledLink>
                          )}

                          {data.coinData?.links?.subreddit_url && (
                            <UnstyledLink
                              openNewTab
                              href={data.coinData?.links?.subreddit_url}
                            >
                              <div className='flex overflow-hidden rounded-xl bg-gray-800 py-3 px-3'>
                                <RiRedditFill className='h-6 w-6 text-[#FF3F19]' />
                              </div>
                            </UnstyledLink>
                          )}

                          {data.coinData?.links?.repos_url?.github[0] && (
                            <UnstyledLink
                              openNewTab
                              href={data.coinData?.links?.repos_url?.github[0]}
                            >
                              <div className='flex overflow-hidden rounded-xl bg-gray-800 py-3 px-3'>
                                <RiGithubFill className='h-6 w-6 text-blue-500' />
                              </div>
                            </UnstyledLink>
                          )}
                        </div>

                        <div className='flex flex-col gap-4'>
                          <div className='h4 text-white'>Facts</div>

                          <hr className='h-px border-0 bg-base'></hr>

                          <div className='flex flex-col gap-10 text-white'>
                            <div className='flex flex-row justify-between'>
                              <div>Hashing Algorithm</div>
                              <div>{data.coinData?.hashing_algorithm}</div>
                            </div>

                            <div className='flex flex-row justify-between'>
                              <div>Country Origin</div>
                              <div>
                                {data.coinData?.country_origin
                                  ? data.coinData?.country_origin
                                  : 'Unknown'}
                              </div>
                            </div>

                            <div className='flex flex-row justify-between'>
                              <div>Category</div>
                              <div>{data.coinData?.categories[0]}</div>
                            </div>
                          </div>

                          <BaseCard className='overflow-hidden !bg-base text-white'>
                            <div className='flex flex-col gap-y-6'>
                              <div className='flex flex-col justify-between lg:flex-row'>
                                <div>Total Supply</div>
                                <div>
                                  {data.coinData?.market_data?.total_supply
                                    ? commaNumber(
                                        data.coinData?.market_data?.total_supply
                                      )
                                    : 'Unknown'}
                                </div>
                              </div>

                              <div className='flex flex-col justify-between lg:flex-row'>
                                <div>Max Supply</div>
                                <div>
                                  {data.coinData?.market_data?.max_supply
                                    ? commaNumber(
                                        data.coinData?.market_data?.max_supply
                                      )
                                    : 'Unknown'}
                                </div>
                              </div>

                              <div className='flex flex-col justify-between lg:flex-row'>
                                <div>Circulating</div>
                                <div>
                                  {data.coinData?.market_data
                                    ?.circulating_supply
                                    ? commaNumber(
                                        data.coinData?.market_data
                                          ?.circulating_supply
                                      )
                                    : 'Unknown'}
                                </div>
                              </div>
                            </div>
                          </BaseCard>
                        </div>
                      </div>
                    </div>

                    <div className='absolute -top-4 right-2 rounded-lg bg-white p-1'>
                      <NextImage
                        alt={data.coinData.id}
                        width={50}
                        height={50}
                        src={data.coinData.image.small}
                      />
                    </div>
                  </>
                </BaseCard>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}

export async function getServerSideProps(context: { query: { id: any } }) {
  const coin = context.query.id;

  const {
    categories,
    description,
    country_origin,
    hashing_algorithm,
    image,
    links,
    market_data: marketData,
    name,
    public_interest_stats,
  } = await CoinGeckoAPI.getCoin(coin);

  const market_data = {
    max_supply: marketData.max_supply,
    total_supply: marketData.total_supply,
    current_price: marketData.current_price,
    price_change_24h: marketData.price_change_percentage_24h,
    circulating_supply: marketData.circulating_supply,
  };

  const coinData = {
    name,
    image,
    links,
    categories,
    market_data,
    description,
    country_origin,
    hashing_algorithm,
    public_interest_stats,
  };

  const history = await CoinGeckoAPI.getCoinHistory(
    coin,
    '1640991600',
    '1671901200'
  );
  const coinHistory = await history.prices;

  const exchangeData = await CoinGeckoAPI.getExchangeRates();
  const exchangeRates = await exchangeData.rates;

  return {
    props: {
      data: {
        coinData,
        coinHistory,
        exchangeRates,
      },
    },
  };
}
