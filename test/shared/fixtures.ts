import { BigNumber } from 'ethers'
import { ethers } from 'hardhat'
import { MockTimeNevorV3Pool } from '../../typechain/MockTimeNevorV3Pool'
import { TestERC20 } from '../../typechain/TestERC20'
import { NevorV3Factory } from '../../typechain/NevorV3Factory'
import { TestNevorV3Callee } from '../../typechain/TestNevorV3Callee'
import { TestNevorV3Router } from '../../typechain/TestNevorV3Router'
import { MockTimeNevorV3PoolDeployer } from '../../typechain/MockTimeNevorV3PoolDeployer'

import { Fixture } from 'ethereum-waffle'

interface FactoryFixture {
  factory: NevorV3Factory
}

async function factoryFixture(): Promise<FactoryFixture> {
  const factoryFactory = await ethers.getContractFactory('NevorV3Factory')
  const factory = (await factoryFactory.deploy()) as NevorV3Factory
  return { factory }
}

interface TokensFixture {
  token0: TestERC20
  token1: TestERC20
  token2: TestERC20
}

async function tokensFixture(): Promise<TokensFixture> {
  const tokenFactory = await ethers.getContractFactory('TestERC20')
  const tokenA = (await tokenFactory.deploy(BigNumber.from(2).pow(255))) as TestERC20
  const tokenB = (await tokenFactory.deploy(BigNumber.from(2).pow(255))) as TestERC20
  const tokenC = (await tokenFactory.deploy(BigNumber.from(2).pow(255))) as TestERC20

  const [token0, token1, token2] = [tokenA, tokenB, tokenC].sort((tokenA, tokenB) =>
    tokenA.address.toLowerCase() < tokenB.address.toLowerCase() ? -1 : 1
  )

  return { token0, token1, token2 }
}

type TokensAndFactoryFixture = FactoryFixture & TokensFixture

interface PoolFixture extends TokensAndFactoryFixture {
  swapTargetCallee: TestNevorV3Callee
  swapTargetRouter: TestNevorV3Router
  createPool(
    fee: number,
    tickSpacing: number,
    firstToken?: TestERC20,
    secondToken?: TestERC20
  ): Promise<MockTimeNevorV3Pool>
}

// Monday, October 5, 2020 9:00:00 AM GMT-05:00
export const TEST_POOL_START_TIME = 1601906400

export const poolFixture: Fixture<PoolFixture> = async function (): Promise<PoolFixture> {
  const { factory } = await factoryFixture()
  const { token0, token1, token2 } = await tokensFixture()

  const MockTimeNevorV3PoolDeployerFactory = await ethers.getContractFactory('MockTimeNevorV3PoolDeployer')
  const MockTimeNevorV3PoolFactory = await ethers.getContractFactory('MockTimeNevorV3Pool')

  const calleeContractFactory = await ethers.getContractFactory('TestNevorV3Callee')
  const routerContractFactory = await ethers.getContractFactory('TestNevorV3Router')

  const swapTargetCallee = (await calleeContractFactory.deploy()) as TestNevorV3Callee
  const swapTargetRouter = (await routerContractFactory.deploy()) as TestNevorV3Router

  return {
    token0,
    token1,
    token2,
    factory,
    swapTargetCallee,
    swapTargetRouter,
    createPool: async (fee, tickSpacing, firstToken = token0, secondToken = token1) => {
      const mockTimePoolDeployer = (await MockTimeNevorV3PoolDeployerFactory.deploy()) as MockTimeNevorV3PoolDeployer
      const tx = await mockTimePoolDeployer.deploy(
        factory.address,
        firstToken.address,
        secondToken.address,
        fee,
        tickSpacing
      )

      const receipt = await tx.wait()
      const poolAddress = receipt.events?.[0].args?.pool as string
      return MockTimeNevorV3PoolFactory.attach(poolAddress) as MockTimeNevorV3Pool
    },
  }
}
