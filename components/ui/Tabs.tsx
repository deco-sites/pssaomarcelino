import { useSignal } from "@preact/signals";
import Image from "apps/website/components/Image.tsx";
import { Image as ImageType } from "https://denopkg.com/deco-sites/std@1.21.7/components/types.ts";

// https://developers.google.com/youtube/player_parameters
// const videoParams = [
//   { key: "originiv_load_policy", value: "3" },
//   { key: "modestbranding", value: "1" },
//   { key: "origin", value: "https://ramonbrasileiro.deco.site" },
//   { key: "rel", value: "0" },
// ];
const addVideoLinkExtraParams = (link: string) => {
  const videoUrl = new URL(link.trim());

  // videoParams.forEach(({ key, value }) =>
  //   videoUrl.searchParams.set(key, value)
  // );

  return videoUrl.toString();
};

const Video = ({ link }: { link: string }) => {
  return (
    <iframe
      width="560"
      height="315"
      src={addVideoLinkExtraParams(link)}
      title="YouTube video player"
      frameBorder={0}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
      class="max-w-full w-full aspect-video"
    >
    </iframe>
  );
};

const getAspectRatio = (width: number, aspectRatio: number) =>
  width / aspectRatio;

const TabContent = (
  { video, image, title, date, text }: NonNullable<Tab["content"]>,
) => {
  return (
    <div class="flex flex-col gap-2">
      {video && <Video link={video} />}
      {image && (
        <Image
          loading="lazy"
          src={image}
          width={460}
          height={getAspectRatio(460, 16 / 9)}
          class="aspect-video w-full"
        />
      )}
      {title && (
        <div>
          {title}
          {date && <div>{date}</div>}
        </div>
      )}
      {text && <p>{text}</p>}
    </div>
  );
};

interface Tab {
  /** @title titulo da aba */
  label: string;

  /** @title Conteudo */
  content?: {
    video?: string;
    /** @title Imagem */
    image?: ImageType;
    /** @title Titulo do conteudo */
    title: string;
    /**
     * @title Data
     * @format date
     */
    date: string;
    /**
     * @title Descrição
     */
    text: string;
  };
  tabs?: Tab[];

  /**
   * @title Variante
   * @default horizontal
   */
  variant?: "horizontal" | "vertical";
}

export interface Props {
  /** @title Aba - {{{label}}} */
  tabs: Tab[];
  /**
   * @title Variante
   * @default horizontal
   */
  variant?: "horizontal" | "vertical";
}

export default function Tabs({ tabs, variant }: Props) {
  const selectedTab = useSignal(0);
  const handleClick = (index: number) => selectedTab.value = index;
  const { content, tabs: nestedTabs, variant: nestedVariant } =
    tabs[selectedTab.value] ?? {};

  if (!tabs || tabs.length === 0) return null;

  const isVertical = variant === "vertical";
  return (
    <div
      class={`flex ${isVertical ? "flex-row-reverse gap-2" : "flex-col gap-4"}`}
    >
      <div class={`tabs ${isVertical ? "flex-col justify-start" : ""}`}>
        {tabs.map(({ label }, index) => (
          <button
            onClick={() => handleClick(index)}
            class={`tab truncate ${
              selectedTab.value === index ? "tab-active bg-base-200" : ""
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      <div class="w-full">
        {content && !nestedTabs && <TabContent {...content} />}
        {nestedTabs && (
          <Tabs
            // key to make the reconciler reset nested tab
            key={selectedTab.value}
            tabs={nestedTabs}
            variant={nestedVariant}
          />
        )}
      </div>
    </div>
  );
}
