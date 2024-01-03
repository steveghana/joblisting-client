import React from 'react';
import { useParams } from 'react-router';
import RoleTabs from './roleTabs';
import { useGetRoleQuery } from '@/store/services/role.service';
import NoData from '@/components/NoData';
import FullscreenProgress, { TransparentScreeProgress } from '@/components/FullscreenProgress/FullscreenProgress';
import Status404 from '@/views/status/Status404';

const JobInfo = () => {
  const { roleid } = useParams();
  const {
    data: role,
    isLoading,
    isFetching,
    isError,
    error,
  } = useGetRoleQuery({
    id: roleid as string,
  });
  if (isLoading || isFetching) {
    return <TransparentScreeProgress />;
  }
  if (isError && error) {
    return <Status404 />;
  }
  if (!role) {
    return <NoData />;
  }
  return <RoleTabs role={role} isExternal={false} />;
};

export default JobInfo;
