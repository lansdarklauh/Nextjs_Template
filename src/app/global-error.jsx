"use client"

export default function GlobalError({error, reset}) {
  return (
    <html lang="zh">
      <body>
        <h1>something went wrong</h1>
        <button onClick={() => reset()}>Try again</button>
      </body>
    </html>
  )
}