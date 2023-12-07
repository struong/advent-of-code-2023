import * as fs from 'fs'

const filePath = './day07/input.txt'

interface Card {
  value: number
}

class Hand {
  cards: Card[]
  bid: number

  constructor(cards: Card[], bid: number) {
    this.cards = cards
    this.bid = bid
  }

  score(): number {
    const counts = this.cards.reduce((counts, card) => {
      counts[card.value] = (counts[card.value] || 0) + 1
      return counts
    }, {})

    const cardCounts = Object.values(counts)

    const wildcards = this.cards.filter((x) => x.value === 1).length

    let rank = 0
    if (cardCounts.includes(5)) {
      rank = 7
    } else if (cardCounts.includes(4)) {
      if (wildcards > 0) {
        rank = 7
      } else {
        rank = 6
      }
    } else if (cardCounts.includes(3) && cardCounts.includes(2)) {
      if (wildcards == 2 || wildcards == 3) {
        rank = 7
      } else if (wildcards == 1) {
        rank = 6
      } else {
        rank = 5
      }
    } else if (cardCounts.includes(3)) {
      if (wildcards == 3) {
        rank = 6
      } else if (wildcards == 2) {
        rank = 7
      } else if (wildcards == 1) {
        rank = 6
      } else {
        rank = 4
      }
    } else if (cardCounts.filter((x) => x === 2).length === 2) {
      if (wildcards == 2) {
        rank = 6
      } else if (wildcards == 1) {
        rank = 5
      } else {
        rank = 3
      }
    } else if (cardCounts.includes(2)) {
      if (wildcards == 1 || wildcards == 2) {
        rank = 4
      } else {
        rank = 2
      }
    } else {
      if (wildcards == 1) {
        rank = 2
      } else {
        rank = 1
      }
    }

    return rank
  }

  compare(other: Hand): number {
    if (this.score() === other.score()) {
      for (let i = 0; i < this.cards.length; i++) {
        if (this.cards[i].value !== other.cards[i].value) {
          return this.cards[i].value > other.cards[i].value ? 1 : -1
        }
      }

      return 0
    }

    return this.score() > other.score() ? 1 : -1
  }
}

try {
  const fileData: string = fs.readFileSync(filePath, 'utf-8')
  const lines: string[] = fileData.split('\n')

  // Test case
  // const lines: string[] = `32T3K 765
  //                         T55J5 684
  //                         KK677 28
  //                         KTJJT 220
  //                         QQQJA 483`
  // .trim()
  // .split('\n')

  let score = 0

  const hands = createHands(lines)

  const sortedHands = hands.sort((a, b) => a.compare(b))

  for (let i = 0; i < sortedHands.length; i++) {
    const hand = sortedHands[i]
    score += hand.bid * (i + 1)
  }

  console.log(`Score: ${score}`)
} catch (error) {
  console.error(`Error reading file: ${error}`)
}

function createHands(lines: string[]): Hand[] {
  let hands: Hand[] = []
  for (const line of lines) {
    const parts = line.trim().split(' ')
    let cards: Card[] = []

    for (const card of parts[0]) {
      if (card === 'T') {
        cards.push({ value: 10 })
      } else if (card === 'J') {
        cards.push({ value: 1 })
      } else if (card === 'Q') {
        cards.push({ value: 12 })
      } else if (card === 'K') {
        cards.push({ value: 13 })
      } else if (card === 'A') {
        cards.push({ value: 14 })
      } else {
        cards.push({ value: parseInt(card) })
      }
    }

    const bid = parseInt(parts[1])
    hands.push(new Hand(cards, bid))
  }

  return hands
}
