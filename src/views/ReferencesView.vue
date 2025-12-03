<script setup>
import { ref, onMounted, nextTick } from "vue";

const imageLoaded = ref(false);

onMounted(async () => {
  imageLoaded.value = false;

  // Wait for router transition
  await nextTick();

  // Small delay to ensure styles are applied
  await new Promise((resolve) => setTimeout(resolve, 50));

  // Show the image with fly-in animation
  imageLoaded.value = true;
});
</script>

<template>
  <div class="flex gap-4 justify-evenly w-full items-center">
    <ul
      class="list-inside flex flex-col gap-4 max-w-prose max-h-[calc(2/3*100vh)] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
    >
      <li>
        Foundation, Mucha. “Poster for ‘Job’ Cigarette Paper (1896).”
        <em>Mucha Foundation</em>,
        www.muchafoundation.org/en/gallery/browse-works/object/44. Accessed 14
        Sept. 2025.
      </li>
      <li>
        “Art Nouveau | A Universal Style.” <em>Europeana</em>,
        www.europeana.eu/en/exhibitions/art-nouveau-a-universal-style. Accessed
        22 Sept. 2025.
      </li>
      <li>
        Edwards, Angela. “The Rise and Influence of Art Nouveau in the Art
        World.” <em>Angela Edwards</em>, 9 June 2023,
        www.angelaedwards.co.uk/the-rise-and-influence-of-art-nouveau-in-the-art-world/.
      </li>
      <li>
        Odriozola, Amaia. “From Kate Moss to Jeremy Allen White: The Secret
        Formula of the Most Famous White Underwear in History.”
        <em>EL PAÍS English</em>, 16 Jan. 2024,
        english.elpais.com/culture/2024-01-16/from-kate-moss-to-jeremy-allen-white-the-secret-formula-of-the-most-famous-white-underwear-in-history.html.
      </li>
      <li>
        Malach, Hannah. “Calvin Klein Advertisements and the Stories behind
        Them: More than 50 Years of Celebrity and Controversy.” <em>WWD</em>,
        WWD, 20 Mar. 2025,
        wwd.com/pop-culture/culture-news/feature/calvin-klein-ads-1236117541/.
      </li>
    </ul>
    <img
      class="h-[calc(2/3*100vh)] reference-image"
      :class="{ 'image-loaded': imageLoaded }"
      src="@/assets/mucha.png"
      alt="Alphonse Mucha"
    />
  </div>
</template>

<style scoped>
/* Image fly-in animation */
.reference-image {
  opacity: 0 !important;
  transform: translateX(50px);
  transition: transform 0.8s ease, opacity 0.8s ease;
}

.reference-image.image-loaded {
  opacity: 1 !important;
  transform: translateX(0);
}
</style>
