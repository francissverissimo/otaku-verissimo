import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_CHARACTER } from "../lib/queries";
import { CircularLoading } from "../components/Loading";
import { SimpleHeader } from "../components/Header";
import { Footer } from "../components/Footer";
import { MyDivider } from "../components/MyComponents";
import { Grow } from "@mui/material";
import { CharacterModel } from "../types";
import { Heart } from "phosphor-react";
import * as ScrollArea from "@radix-ui/react-scroll-area";

export function Character() {
  const { id } = useParams() as { id: string };

  const { data, error } = useQuery(GET_CHARACTER, {
    variables: { id: id },
    notifyOnNetworkStatusChange: true,
    onCompleted(data) {
      document.title = `${data.Character.name.full} · otakuVERISSIMO`;
    },
    onError(error) {
      console.error(error);
    },
  });

  const character: CharacterModel = data && data.Character;

  useEffect(() => {
    scrollTo({ top: 0 });
  }, []);

  if (error)
    return (
      <div className="flex flex-col p-4 m-auto bg-zinc-50 shadow-xl">
        <strong>{error.name}</strong>
        <span>{error.message}</span>
      </div>
    );

  if (!character && !error) return <CircularLoading />;

  return (
    <div className="flex flex-col justify-between min-h-screen pt-10 bg-zinc-100">
      <SimpleHeader />

      {character && (
        <div className="flex flex-col gap-2 mb-auto py-4 max-w-6xl mx-auto w-full">
          <div className="flex flex-col items-center">
            <strong className="text-2xl">{character.name.full}</strong>
            <span>{character.name.native}</span>
          </div>

          <div className="min-h-[312px] place-self-center">
            <img
              src={character.image.large}
              alt={character.name.full}
              loading="lazy"
              style={{
                opacity: 0,
                transform: "scale(0.84)",
                transitionDuration: "700ms",
              }}
              onLoad={(t) => {
                t.currentTarget.style.opacity = "1";
                t.currentTarget.style.transform = "initial";
              }}
              className="w-52 rounded shadow-lg"
            />
          </div>

          {character.favourites > 0 && (
            <div className="flex gap-1 items-center place-self-center min-h-[22px]">
              <Heart size={22} weight="fill" className="text-red-600" />
              <span className="text-zinc-600 text-sm font-medium">
                {character.favourites}
              </span>
            </div>
          )}

          <Grow in timeout={400}>
            <div className="flex flex-col gap-4 pb-4">
              <strong className="text-lg font-medium px-4">
                Voices Actors
              </strong>

              <ScrollArea.Root type="always">
                <ScrollArea.Viewport className="duration-100 px-4 md:pb-4">
                  <div className="flex gap-4">
                    {character.media.edges[0].voiceActors.map((voiceActor) => (
                      <Link key={voiceActor.id} to={`/staff/${voiceActor.id}`}>
                        <div className="flex flex-col w-28">
                          <div className="bg-gradient-to-t from-zinc-600 via-zinc-400 to-zinc-300 h-28 w-full rounded-full overflow-hidden">
                            <img
                              src={voiceActor.image.large}
                              alt={voiceActor.name.full}
                              className="object-cover h-28 w-full shadow-black/10 shadow-lg rounded-full"
                              loading="lazy"
                              style={{
                                opacity: 0,
                                transitionDuration: "700ms",
                              }}
                              onLoad={(t) => {
                                t.currentTarget.style.opacity = "1";
                              }}
                            />
                          </div>

                          <span className="font-medium line-clamp-2 mt-2 text-center">
                            {voiceActor.name.full}
                          </span>

                          <span className="text-main font-medium line-clamp-2 text-center">
                            {voiceActor.languageV2}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </ScrollArea.Viewport>

                <ScrollArea.Scrollbar
                  className="hidden md:flex rounded bg-transparent duration-100 h-3 px-4"
                  orientation="horizontal"
                >
                  <ScrollArea.Thumb className="active:bg-zinc-500 bg-zinc-400 duration-100 rounded" />
                </ScrollArea.Scrollbar>
              </ScrollArea.Root>
            </div>
          </Grow>

          <Grow in timeout={900}>
            <div className="flex flex-col gap-4 px-4">
              <strong className="text-lg font-medium">Series</strong>
              <div className="grid grid-cols-[repeat(auto-fill,minmax(110px,1fr))] lg:grid-cols-[repeat(auto-fill,160px)] gap-y-4 gap-x-4 justify-between">
                {character.media.edges.map((edge) =>
                  edge.node.type == "ANIME" ? (
                    <Link key={edge.node.id} to={`/anime/${edge.node.id}`}>
                      <div className="bg-gradient-to-t from-orange-700 via-orange-600 to-orange-500 rounded">
                        <img
                          src={edge.node.coverImage.large}
                          alt={edge.node.title.romaji}
                          loading="lazy"
                          style={{
                            opacity: 0,
                            aspectRatio: "6/9",
                            objectFit: "cover",
                            width: "100%",
                            transitionDuration: "700ms",
                          }}
                          onLoad={(t) => {
                            t.currentTarget.style.opacity = "1";
                          }}
                          className="shadow-black/20 shadow-lg rounded"
                        />
                      </div>

                      <span className="text-sm font-medium line-clamp-2 min-h-[20px] mt-2">
                        {edge.node.title.romaji}
                      </span>
                    </Link>
                  ) : (
                    <div key={edge.node.id}>
                      <div className="bg-gradient-to-t from-orange-700 via-orange-600 to-orange-500 rounded">
                        <img
                          src={edge.node.coverImage.large}
                          alt={edge.node.title.romaji}
                          loading="lazy"
                          style={{
                            opacity: 0,
                            aspectRatio: "6/9",
                            objectFit: "cover",
                            width: "100%",
                            transitionDuration: "700ms",
                          }}
                          onLoad={(t) => {
                            t.currentTarget.style.opacity = "1";
                          }}
                          className="shadow-black/20 shadow-lg rounded"
                        />
                      </div>

                      <span className="text-sm font-medium line-clamp-2 min-h-[20px] mt-2">
                        {edge.node.title.romaji}
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>
          </Grow>
        </div>
      )}

      <MyDivider />

      <Footer />
    </div>
  );
}
