export type Endpoint = {
  id: string;
  method: "GET" | "POST";
  path: string;
  title: string;
  category: "AI" | "Downloader" | "Tools" | "Music" | "Search" | "Movie" | "Server";
  description: string;
  params: { name: string; type: string; required: boolean; description: string }[];
  curlExample: string;
  jsExample: string;
  pythonExample?: string;
  javaExample?: string;
  response: string;
};

export const apiEndpoints: Endpoint[] = [
  // ============ AI CATEGORY (3 endpoints) ============
  {
    id: "ai-gpt4",
    method: "POST",
    path: "/ai/gpt4",
    title: "GPT-4",
    category: "AI",
    description: "Access GPT-4 AI model for chat completion",
    params: [
      { name: "messages", type: "array", required: true, description: "Body parameter messages" },
      { name: "user_id", type: "string", required: true, description: "Body parameter user_id" }
    ],
    curlExample: `curl -X POST "https://host.optikl.ink/ai/gpt4" \\
  -H "Content-Type: application/json" \\
  -d '{
  "messages": [\\
    {\\
      "role": "system",\\
      "content": "Good Person"\\
    },\\
    {\\
      "role": "user",\\
      "content": "hai"\\
    }\\
  ],
  "user_id": "1234"
}'`,
    jsExample: `fetch('https://host.optikl.ink/ai/gpt4', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
  "messages": [\\
    {\\
      "role": "system",\\
      "content": "Good Person"\\
    },\\
    {\\
      "role": "user",\\
      "content": "hai"\\
    }\\
  ],
  "user_id": "1234"
})
})
.then(response => response.json())
.then(data => console.log(data))`,
    response: `[]`
  },
  {
    id: "ai-perplexity",
    method: "GET",
    path: "/ai/perplexity",
    title: "Perplexity",
    category: "AI",
    description: "Access Perplexity AI model for chat completion",
    params: [
      { name: "prompt", type: "string", required: true, description: "Query parameter prompt" }
    ],
    curlExample: `curl -X GET "https://host.optikl.ink/ai/perplexity?prompt=value"`,
    jsExample: `fetch('https://host.optikl.ink/ai/perplexity?prompt=value')
  .then(response => response.json())
  .then(data => console.log(data))`,
    response: `{
  "response": "Prabowo Subianto"
}`
  },
  {
    id: "ai-storygenerator",
    method: "POST",
    path: "/ai/storygenerator",
    title: "Story Generator",
    category: "AI",
    description: "Create compelling short stories and novels with AI assistance.",
    params: [
      { name: "text", type: "string", required: true, description: "Body parameter text" },
      { name: "client", type: "string", required: true, description: "Body parameter client" },
      { name: "mode", type: "string", required: true, description: "Body parameter mode" },
      { name: "length", type: "string", required: true, description: "Body parameter length" },
      { name: "creative", type: "string", required: true, description: "Body parameter creative" },
      { name: "language", type: "string", required: true, description: "Body parameter language" },
      { name: "syllable", type: "object", required: true, description: "Body parameter syllable" }
    ],
    curlExample: `curl -X POST "https://host.optikl.ink/ai/storygenerator" \\
  -H "Content-Type: application/json" \\
  -d '{
  "text": "seks",
  "client": "client_name",
  "mode": "Young Adult",
  "length": "Novel",
  "creative": "High",
  "language": "id",
  "syllable": {"min": 2, "max": 4}
}'`,
    jsExample: `fetch('https://host.optikl.ink/ai/storygenerator', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
  "text": "seks",
  "client": "client_name",
  "mode": "Young Adult",
  "length": "Novel",
  "creative": "High",
  "language": "id",
  "syllable": {"min": 2, "max": 4}
})
})
.then(response => response.json())
.then(data => console.log(data))`,
    response: `{
  "success": true,
  "text": "story here"
}`
  },

  // ============ DOWNLOADER CATEGORY (7 endpoints) ============
  {
    id: "dl-facebook",
    method: "GET",
    path: "/download/facebook",
    title: "Facebook Downloader",
    category: "Downloader",
    description: "Facebook Video/Audio Downloader",
    params: [
      { name: "url", type: "string", required: true, description: "Query parameter url" }
    ],
    curlExample: `curl -X GET "https://host.optikl.ink/download/facebook?url=value"`,
    jsExample: `fetch('https://host.optikl.ink/download/facebook?url=value')
  .then(response => response.json())
  .then(data => console.log(data))`,
    response: `[]`
  },
  {
    id: "dl-threads",
    method: "GET",
    path: "/download/threads",
    title: "Threads Downloader",
    category: "Downloader",
    description: "Threads Video/Photo Downloader",
    params: [
      { name: "url", type: "string", required: true, description: "Query parameter url" }
    ],
    curlExample: `curl -X GET "https://host.optikl.ink/download/threads?url=value"`,
    jsExample: `fetch('https://host.optikl.ink/download/threads?url=value')
  .then(response => response.json())
  .then(data => console.log(data))`,
    response: `[]`
  },
  {
    id: "dl-x",
    method: "GET",
    path: "/download/x",
    title: "X Downloader",
    category: "Downloader",
    description: "X Video/Audio Downloader",
    params: [
      { name: "url", type: "string", required: true, description: "Query parameter url" }
    ],
    curlExample: `curl -X GET "https://host.optikl.ink/download/x?url=value"`,
    jsExample: `fetch('https://host.optikl.ink/download/x?url=value')
  .then(response => response.json())
  .then(data => console.log(data))`,
    response: `[]`
  },
  {
    id: "dl-pinterest",
    method: "GET",
    path: "/download/pinterest",
    title: "Pinterest Downloader",
    category: "Downloader",
    description: "Pinterest Video Downloader",
    params: [
      { name: "url", type: "string", required: true, description: "Query parameter url" }
    ],
    curlExample: `curl -X GET "https://host.optikl.ink/download/pinterest?url=value"`,
    jsExample: `fetch('https://host.optikl.ink/download/pinterest?url=value')
  .then(response => response.json())
  .then(data => console.log(data))`,
    response: `[]`
  },
  {
    id: "dl-youtube",
    method: "GET",
    path: "/download/youtube",
    title: "YouTube Downloader",
    category: "Downloader",
    description: "YouTube Video/Audio Downloader, (Available format: mp3, 144, 240, 360, 480, 720, 1080)",
    params: [
      { name: "url", type: "string", required: true, description: "Query parameter url" },
      { name: "format", type: "string", required: true, description: "Query parameter format" }
    ],
    curlExample: `curl -X GET "https://host.optikl.ink/download/youtube?url=value&format=value"`,
    jsExample: `fetch('https://host.optikl.ink/download/youtube?url=value&format=value')
  .then(response => response.json())
  .then(data => console.log(data))`,
    response: `[]`
  },
  {
    id: "dl-ytmp3",
    method: "POST",
    path: "/download/ytmp3",
    title: "YouTube Audio Downloader",
    category: "Downloader",
    description: "Download YouTube audio",
    params: [
      { name: "url", type: "string", required: true, description: "Body parameter url" }
    ],
    curlExample: `curl -X POST "https://host.optikl.ink/download/ytmp3" \\
  -H "Content-Type: application/json" \\
  -d '{
  "url": "https://youtu.be/PsKItQNwjrM?si=vrWRZ3EBjf9cesrd"
}'`,
    jsExample: `fetch('https://host.optikl.ink/download/ytmp3', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
  "url": "https://youtu.be/PsKItQNwjrM?si=vrWRZ3EBjf9cesrd"
})
})
.then(response => response.json())
.then(data => console.log(data))`,
    response: `{
  "url": "link download"
}`
  },
  {
    id: "dl-mediafire",
    method: "GET",
    path: "/download/mediafire",
    title: "MediaFire Downloader",
    category: "Downloader",
    description: "MediaFire Downloader",
    params: [
      { name: "url", type: "string", required: true, description: "Query parameter url" }
    ],
    curlExample: `curl -X GET "https://host.optikl.ink/download/mediafire?url=value"`,
    jsExample: `fetch('https://host.optikl.ink/download/mediafire?url=value')
  .then(response => response.json())
  .then(data => console.log(data))`,
    response: `{
  "success": true,
  "data": {
    "download_url": "https://example.com",
    "filename": "example",
    "filesize": "1MB",
    "filetype": "ZIP",
    "upload_date": "2024-12-10 13:41:44",
    "source_url": "https://www.mediafire.com/file/1iu7hqs377e96uf/qioV19(Beal).zip"
  }
}`
  },

  // ============ TOOLS CATEGORY (9 endpoints) ============
  {
    id: "tool-translate",
    method: "GET",
    path: "/tools/translate",
    title: "Translator",
    category: "Tools",
    description: "Translate any text you want",
    params: [
      { name: "text", type: "string", required: true, description: "Query parameter text" },
      { name: "to", type: "string", required: true, description: "Query parameter to" }
    ],
    curlExample: `curl -X GET "https://host.optikl.ink/tools/translate?text=value&to=value"`,
    jsExample: `fetch('https://host.optikl.ink/tools/translate?text=value&to=value')
  .then(response => response.json())
  .then(data => console.log(data))`,
    response: `[]`
  },
  {
    id: "tool-upload",
    method: "POST",
    path: "/file/upload",
    title: "Uploader",
    category: "Tools",
    description: "Upload file to url with ease",
    params: [
      { name: "file", type: "file", required: true, description: "Form data parameter file" }
    ],
    curlExample: `curl -X POST "https://host.optikl.ink/file/upload" \\
  -F "file=@/path/to/file"`,
    jsExample: `const formData = new FormData();
formData.append('file', fileInput.files[0]);

fetch('https://host.optikl.ink/file/upload', {
  method: 'POST',
  body: formData
})
.then(response => response.json())
.then(data => console.log(data))`,
    response: `[]`
  },
  {
    id: "tool-upscale",
    method: "POST",
    path: "/tools/upscaling",
    title: "Image Upscaling 2k",
    category: "Tools",
    description: "Upscale and enhance image quality from a file without requiring API keys. The processed image is uploaded to a remote storage and the URL is returned.",
    params: [
      { name: "file", type: "file", required: true, description: "Form data parameter file" }
    ],
    curlExample: `curl -X POST "https://host.optikl.ink/tools/upscaling" \\
  -F "file=@/path/to/file"`,
    jsExample: `const formData = new FormData();
formData.append('file', fileInput.files[0]);

fetch('https://host.optikl.ink/tools/upscaling', {
  method: 'POST',
  body: formData
})
.then(response => response.json())
.then(data => console.log(data))`,
    response: `{
  "success": true,
  "data": {
    "url": "https://cdn.botzaku.eu.org/example"
  }
}`
  },
  {
    id: "tool-subfinder",
    method: "GET",
    path: "/tools/subfinder",
    title: "Sub Domain Finder",
    category: "Tools",
    description: "Look for sub domains from the main domain",
    params: [
      { name: "domain", type: "string", required: true, description: "Query parameter domain" }
    ],
    curlExample: `curl -X GET "https://host.optikl.ink/tools/subfinder?domain=value"`,
    jsExample: `fetch('https://host.optikl.ink/tools/subfinder?domain=value')
  .then(response => response.json())
  .then(data => console.log(data))`,
    response: `[]`
  },
  {
    id: "tool-domain-info",
    method: "GET",
    path: "/tools/domain-info",
    title: "Domain Information",
    category: "Tools",
    description: "Domain and sub domain information",
    params: [
      { name: "domain", type: "string", required: true, description: "Query parameter domain" }
    ],
    curlExample: `curl -X GET "https://host.optikl.ink/tools/domain-info?domain=value"`,
    jsExample: `fetch('https://host.optikl.ink/tools/domain-info?domain=value')
  .then(response => response.json())
  .then(data => console.log(data))`,
    response: `[]`
  },
  {
    id: "tool-check-host",
    method: "GET",
    path: "/tools/check-host",
    title: "Check Host",
    category: "Tools",
    description: "Check Host Domain, Available types: (ping, http, tcp, udp, dns, info)",
    params: [
      { name: "host", type: "string", required: true, description: "Query parameter host" },
      { name: "type", type: "string", required: true, description: "Query parameter type" }
    ],
    curlExample: `curl -X GET "https://host.optikl.ink/tools/check-host?host=value&type=value"`,
    jsExample: `fetch('https://host.optikl.ink/tools/check-host?host=value&type=value')
  .then(response => response.json())
  .then(data => console.log(data))`,
    response: `[]`
  },
  {
    id: "tool-tempmail-create",
    method: "GET",
    path: "/tools/tempmail",
    title: "Tempmail Create",
    category: "Tools",
    description: "Create a temporary email",
    params: [
      { name: "action", type: "string", required: true, description: "Query parameter action" }
    ],
    curlExample: `curl -X GET "https://host.optikl.ink/tools/tempmail?action=value"`,
    jsExample: `fetch('https://host.optikl.ink/tools/tempmail?action=value')
  .then(response => response.json())
  .then(data => console.log(data))`,
    response: `[]`
  },
  {
    id: "tool-tempmail-check",
    method: "GET",
    path: "/tools/tempmail",
    title: "Check Inbox Tempmail",
    category: "Tools",
    description: "Check your temporary email inbox",
    params: [
      { name: "action", type: "string", required: true, description: "Query parameter action" },
      { name: "token", type: "string", required: true, description: "Query parameter token" }
    ],
    curlExample: `curl -X GET "https://host.optikl.ink/tools/tempmail?action=value&token=value"`,
    jsExample: `fetch('https://host.optikl.ink/tools/tempmail?action=value&token=value')
  .then(response => response.json())
  .then(data => console.log(data))`,
    response: `[]`
  },
  {
    id: "whatsapp-otp",
    method: "GET",
    path: "/whatsapp/otp",
    title: "OTP Verification WhatsApp",
    category: "Tools",
    description: "Verify that the WhatsApp number is active and belongs to the user.",
    params: [
      { name: "number", type: "string", required: true, description: "Query parameter number" }
    ],
    curlExample: `curl -X GET "https://host.optikl.ink/whatsapp/otp?number=value"`,
    jsExample: `fetch('https://host.optikl.ink/whatsapp/otp?number=value')
  .then(response => response.json())
  .then(data => console.log(data))`,
    response: `{
  "success": true,
  "message": "OTP successfully sent to WhatsApp",
  "data": {
    "entry": {
      "number": "6281234567890",
      "status": "completed",
      "check": false,
      "active": true,
      "otp": "123456",
      "createdAt": 1765136356018,
      "updatedAt": 1765138137880,
      "lastOtpAt": 1765138132966,
      "ip": "172.9.151.2"
    }
  }
}`
  },
  {
    id: "data-data",
    method: "GET",
    path: "/data/data",
    title: "Api Path",
    category: "Tools",
    description: "Bruh...",
    params: [],
    curlExample: `curl -X GET "https://host.optikl.ink/data/data"`,
    jsExample: `fetch('https://host.optikl.ink/data/data')
  .then(response => response.json())
  .then(data => console.log(data))`,
    response: `[]`
  },

  // ============ MUSIC CATEGORY (2 endpoints) ============
  {
    id: "soundcloud-search",
    method: "GET",
    path: "/soundcloud/search",
    title: "Soundcloud Track Search",
    category: "Music",
    description: "Find your favorite songs on SoundCloud",
    params: [
      { name: "query", type: "string", required: true, description: "Query parameter query" }
    ],
    curlExample: `curl -X GET "https://host.optikl.ink/soundcloud/search?query=value"`,
    jsExample: `fetch('https://host.optikl.ink/soundcloud/search?query=value')
  .then(response => response.json())
  .then(data => console.log(data))`,
    response: `[]`
  },
  {
    id: "soundcloud-download",
    method: "GET",
    path: "/soundcloud/download",
    title: "Soundcloud Track Downloader",
    category: "Music",
    description: "Download your favorite songs on SoundCloud",
    params: [
      { name: "url", type: "string", required: true, description: "Query parameter url" }
    ],
    curlExample: `curl -X GET "https://host.optikl.ink/soundcloud/download?url=value"`,
    jsExample: `fetch('https://host.optikl.ink/soundcloud/download?url=value')
  .then(response => response.json())
  .then(data => console.log(data))`,
    response: `[]`
  },

  // ============ SEARCH CATEGORY (1 endpoint) ============
  {
    id: "search-pinterest",
    method: "POST",
    path: "/search/pinterest",
    title: "Pinterest Lens",
    category: "Search",
    description: "Search pinterest image with pinterest lens",
    params: [
      { name: "image", type: "file", required: true, description: "Form data parameter image" }
    ],
    curlExample: `curl -X POST "https://host.optikl.ink/search/pinterest" \\
  -F "image=@/path/to/file"`,
    jsExample: `const formData = new FormData();
formData.append('image', fileInput.files[0]);

fetch('https://host.optikl.ink/search/pinterest', {
  method: 'POST',
  body: formData
})
.then(response => response.json())
.then(data => console.log(data))`,
    response: `[]`
  },

  // ============ MOVIE CATEGORY (10 endpoints) ============
  {
    id: "movie-popular",
    method: "GET",
    path: "/movie/popular",
    title: "Popular Movies",
    category: "Movie",
    description: "Popular Movies List.\nThumbnail use: https://image.tmdb.org/t/p/w500${poster_path}",
    params: [
      { name: "page", type: "string", required: true, description: "Query parameter page" }
    ],
    curlExample: `curl -X GET "https://host.optikl.ink/movie/popular?page=value"`,
    jsExample: `fetch('https://host.optikl.ink/movie/popular?page=value')
  .then(response => response.json())
  .then(data => console.log(data))`,
    response: `[]`
  },
  {
    id: "movie-trending",
    method: "GET",
    path: "/movie/trending",
    title: "Trending Movies",
    category: "Movie",
    description: "Trending movies list.\nThumbnail use: https://image.tmdb.org/t/p/w500${poster_path}",
    params: [
      { name: "page", type: "string", required: true, description: "Query parameter page" }
    ],
    curlExample: `curl -X GET "https://host.optikl.ink/movie/trending?page=value"`,
    jsExample: `fetch('https://host.optikl.ink/movie/trending?page=value')
  .then(response => response.json())
  .then(data => console.log(data))`,
    response: `[]`
  },
  {
    id: "movie-top-rated",
    method: "GET",
    path: "/movie/top-rated",
    title: "Top Rated Movies",
    category: "Movie",
    description: "Top Rated Movies List.\nThumbnail use: https://image.tmdb.org/t/p/w500${poster_path}",
    params: [
      { name: "page", type: "string", required: true, description: "Query parameter page" }
    ],
    curlExample: `curl -X GET "https://host.optikl.ink/movie/top-rated?page=value"`,
    jsExample: `fetch('https://host.optikl.ink/movie/top-rated?page=value')
  .then(response => response.json())
  .then(data => console.log(data))`,
    response: `[]`
  },
  {
    id: "movie-upcoming",
    method: "GET",
    path: "/movie/upcoming",
    title: "Upcoming Movies",
    category: "Movie",
    description: "Upcoming Movies List.\nThumbnail use: https://image.tmdb.org/t/p/w500${poster_path}",
    params: [
      { name: "page", type: "string", required: true, description: "Query parameter page" }
    ],
    curlExample: `curl -X GET "https://host.optikl.ink/movie/upcoming?page=value"`,
    jsExample: `fetch('https://host.optikl.ink/movie/upcoming?page=value')
  .then(response => response.json())
  .then(data => console.log(data))`,
    response: `[]`
  },
  {
    id: "movie-search",
    method: "GET",
    path: "/movie/search",
    title: "Search Movies",
    category: "Movie",
    description: "Search Movies Using Query Text.\nThumbnail use: https://image.tmdb.org/t/p/w500${poster_path}",
    params: [
      { name: "query", type: "string", required: true, description: "Query parameter query" },
      { name: "page", type: "string", required: true, description: "Query parameter page" }
    ],
    curlExample: `curl -X GET "https://host.optikl.ink/movie/search?query=value&page=value"`,
    jsExample: `fetch('https://host.optikl.ink/movie/search?query=value&page=value')
  .then(response => response.json())
  .then(data => console.log(data))`,
    response: `[]`
  },
  {
    id: "movie-list",
    method: "GET",
    path: "/movie/list",
    title: "List Movies",
    category: "Movie",
    description: "List All Movies.\nThumbnail use: https://image.tmdb.org/t/p/w500${poster_path}",
    params: [
      { name: "page", type: "string", required: true, description: "Query parameter page" }
    ],
    curlExample: `curl -X GET "https://host.optikl.ink/movie/list?page=value"`,
    jsExample: `fetch('https://host.optikl.ink/movie/list?page=value')
  .then(response => response.json())
  .then(data => console.log(data))`,
    response: `[]`
  },
  {
    id: "movie-genres",
    method: "GET",
    path: "/movie/genres",
    title: "Genre Movies",
    category: "Movie",
    description: "Genre Movies List.",
    params: [],
    curlExample: `curl -X GET "https://host.optikl.ink/movie/genres"`,
    jsExample: `fetch('https://host.optikl.ink/movie/genres')
  .then(response => response.json())
  .then(data => console.log(data))`,
    response: `[]`
  },
  {
    id: "movie-detail",
    method: "GET",
    path: "/movie/detail",
    title: "Movie Details",
    category: "Movie",
    description: "Movie Details Use Id.\nThumbnail use: https://image.tmdb.org/t/p/w500${poster_path}",
    params: [
      { name: "movieId", type: "string", required: true, description: "Query parameter movieId" }
    ],
    curlExample: `curl -X GET "https://host.optikl.ink/movie/detail?movieId=value"`,
    jsExample: `fetch('https://host.optikl.ink/movie/detail?movieId=value')
  .then(response => response.json())
  .then(data => console.log(data))`,
    response: `[]`
  },
  {
    id: "movie-credits",
    method: "GET",
    path: "/movie/credits",
    title: "Credits Movies",
    category: "Movie",
    description: "Credits Movies Use Id.\nThumbnail use: https://image.tmdb.org/t/p/w500${profile_path}",
    params: [
      { name: "movieId", type: "string", required: true, description: "Query parameter movieId" }
    ],
    curlExample: `curl -X GET "https://host.optikl.ink/movie/credits?movieId=value"`,
    jsExample: `fetch('https://host.optikl.ink/movie/credits?movieId=value')
  .then(response => response.json())
  .then(data => console.log(data))`,
    response: `[]`
  },
  {
    id: "movie-recommended",
    method: "GET",
    path: "/movie/recommended",
    title: "Recommended Movies",
    category: "Movie",
    description: "Recommended Movies List.\nThumbnail use: https://image.tmdb.org/t/p/w500${poster_path}",
    params: [
      { name: "movieId", type: "string", required: true, description: "Query parameter movieId" },
      { name: "page", type: "string", required: true, description: "Query parameter page" }
    ],
    curlExample: `curl -X GET "https://host.optikl.ink/movie/recommended?movieId=value&page=value"`,
    jsExample: `fetch('https://host.optikl.ink/movie/recommended?movieId=value&page=value')
  .then(response => response.json())
  .then(data => console.log(data))`,
    response: `[]`
  },

  // ============ SERVER CATEGORY (1 endpoint) ============
  {
    id: "movie-server",
    method: "GET",
    path: "/movie/server",
    title: "Server Movies",
    category: "Server",
    description: "Server for embedding movie videos.\nUse imdb_id example: https://vidsrc.vip/embed/movie/${imdb_id}",
    params: [],
    curlExample: `curl -X GET "https://host.optikl.ink/movie/server"`,
    jsExample: `fetch('https://host.optikl.ink/movie/server')
  .then(response => response.json())
  .then(data => console.log(data))`,
    response: `[]`
  }
];
