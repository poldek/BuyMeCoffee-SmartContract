import React from 'react'
import { Skeleton } from '@mantine/core';

function LoaderBar() {
  return (
 
      <Skeleton height={400} mt={6} width="100%" radius="lg">
      </Skeleton>

  )
}

export default LoaderBar