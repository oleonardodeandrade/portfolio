import React, { Fragment } from 'react';

import { Container } from 'layouts/Container';
import { GetStaticProps } from 'next';
import { StickyColumn } from 'layouts/StickyColumn';
import { getToolboxInfo } from '@/lib/notion';
import { renderBlocks } from '@/lib/renderBlocks';

export default function Toolbox({ toolboxContent }) {
  return (
    <Container>
      <h1>
        <span className="block text-base text-center text-teal-500 dark:text-teal-400 font-semibold tracking-wide uppercase">
          Toolbox
        </span>
        <span className="mt-2 block text-4xl text-center leading-10 font-bold sm:text-5xl max-w-2xl mx-auto">
          Here's what I use on the daily.
        </span>
      </h1>
      <StickyColumn>
        <div className="col-span-8 mt-12">
          <div className="space-y-16">
            {toolboxContent.map((block) => (
              <Fragment key={block.id}>{renderBlocks(block)}</Fragment>
            ))}
          </div>
        </div>
      </StickyColumn>
    </Container>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const data = await getToolboxInfo(process.env.TOOLBOX_PAGE_ID);

  return {
    props: {
      toolboxContent: data
    },
    revalidate: 1800
  };
};
