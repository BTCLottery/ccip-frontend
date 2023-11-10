<!-- CCIP FRONTEND UI -->
 1. [x] Extract from BTCLOTTERY Frontend Interface the General Acccess CCIP
 2. [x] Cleanup dead code after migrating wallets & network logic from BTCLP UI
 3. [x] Migrate multichain RPC wallet balances logic in frontend from backend
 4. [] Start rebranding with Chainlinks Logo, Colors, Fonts
 5. [] Create a toggle logic to switch between Mainnet/Testnet
 6. [] Create a toggle logic to switch between CCIP Private Beta & General Access
 7. [] Create modal with supported tokens on each chain 
 8. [] Create Chainlinks Private Beta Hooks for the whitelisted CCIP Sender contracts
 9. [] Enhance approve button to either select MAX_INT or the given input amount
10. [] Track CCIP Transfers
11. [] Add notifications

<!-- SMART CONTRACTS -->
1. [] We need to create the smart contracts that will be whitelisted for the Chainlink Private Beta Phase
2. [] We should use CREATE2 to create the same deterministic address on all 7 Mainnet / Testnet Chains
3. [] Deploy on all 7 Testnets at once or just the ones users configure