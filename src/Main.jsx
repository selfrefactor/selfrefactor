import {useCurrentFrame, useVideoConfig} from 'remotion';
import {z} from 'zod';
import {Content} from './Content';
import {getProgress} from './utils';

export const mainSchema = z.object({
	repoOrg: z.string(),
	repoName: z.string(),
	starCount: z.number().step(1),
	duration: z.number().step(1),
});

export function Main({repoOrg, repoName, stargazers}) {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const extraEnding = fps;

	if (!stargazers) {
		return null;
	}

	const progress = getProgress(
		frame,
		durationInFrames - extraEnding,
		stargazers.length,
		fps
	);

	return (
		<Content
			stargazers={stargazers}
			repoOrg={repoOrg}
			repoName={repoName}
			progress={progress}
		/>
	);
}
