import {useCallback} from 'react';
import {CalculateMetadataFunction, Composition} from 'remotion';
import {fetchStargazers} from './fetch';
import {Main, MainProps, mainSchema} from './Main';
import {waitForNoInput} from './wait-for-no-input';

const FPS = 30;

export const RemotionRoot = () => {
	const calculateMetadata = useCallback(
		async ({props, abortSignal}) => {
			await waitForNoInput(abortSignal, 500);

			const stargazers = await fetchStargazers({
				repoOrg: props.repoOrg,
				repoName: props.repoName,
				starCount: props.starCount,
				abortSignal,
			});

			return {
				props: {
					...props,
					stargazers,
				},
				durationInFrames: props.duration * FPS,
			};
		},
		[]
	);

	return (
		<Composition
			id="main"
			component={Main}
			fps={FPS}
			width={960}
			height={540}
			schema={mainSchema}
			calculateMetadata={calculateMetadata}
			defaultProps={{
				repoOrg: 'code-hike',
				repoName: 'codehike',
				starCount: 100,
				duration: 15,
				stargazers: null,
			}}
		/>
	);
};
