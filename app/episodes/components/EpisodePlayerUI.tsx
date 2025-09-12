"use client";

interface Props {
  url: string;
}

export const EpisodePlayer = ({ url }: Props) => {
  return (
    <div className="mt-4 bg-black bg-opacity-40 p-4 rounded-lg">
      <audio controls src={url} className="w-full" />
    </div>
  );
};
