import * as React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import styled from "styled-components";

interface IWrapper {
    height: string;
    width: string;
}
const Wrapper = styled.div<IWrapper>`
    height: ${({ height }) => height};
    width: ${({ width }) => width};
    overflow-y: scroll;
`;

interface IPaginateProps {
    query: string;
    variables: any;
    numItems: number;
    afterId: string;
    itemName: string;
    height: string;
    width: string;
    renderItems: (data: any) => JSX.Element | JSX.Element[];
}

export const InfiniteScroll: React.FC<IPaginateProps> = ({ query, variables, numItems, afterId, itemName, height, width, renderItems }) => {
    const [hasNextPage, setHasNextPage] = React.useState<boolean>(true);
    const [cache, setCache] = React.useState<Array<any>>([]);
    const [lastFetchHeight, setLastFetchHeight] = React.useState<number>(0);
    const { loading, error, data, refetch } = useQuery(gql(query), { variables: { ...variables, first: numItems, after: afterId } });

    React.useEffect(() => {
        if (!loading) {
            setCache(cache.concat(data[itemName].edges));
            setHasNextPage(data[itemName].pageInfo.hasNextPage);
        }
    }, [data]);

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const amountScrolled = e.currentTarget.scrollTop;
        const contentHeight = e.currentTarget.offsetHeight;
        const scrollHeight = e.currentTarget.scrollHeight;
        if (amountScrolled === (scrollHeight - contentHeight) && amountScrolled > lastFetchHeight) {
            refetch({ first: numItems, after: data[itemName].pageInfo.endCursor })
            setLastFetchHeight(amountScrolled);
        }
    };

    if (error) {
        return (
            <div>{error.message}</div>
        );
    }

    return (
        <Wrapper height={height} width={width} onScroll={handleScroll}>
            {renderItems(cache)}
            {loading && <div key="loadingmoreitems">loading...</div>}
        </Wrapper>
    );
}