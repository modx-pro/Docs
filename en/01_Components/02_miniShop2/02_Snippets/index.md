All the snippets of miniShop2 work with [pdoTools][1] and count on [Fenom][2] using in chunks.

I.e. they, for example, do not process cart goods, but simply transfer product array to the chunk.
This allows:
- reduce the total number of chunks
- improve convenience (to edit cart in 1 place instead of 3)
- accelerate (to parse only 1 chunk, not 3 - 10 depending of cart goods)
- complicate chunks using advanced verification of conditions through Fenom functions

miniShop2.4 is the first MODX component which uses Fenom syntax chunks only.

[1]: /en/01_Components/01_pdoTools
[2]: /en/01_Components/01_pdoTools/03_Parser.md
